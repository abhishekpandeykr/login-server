const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt,
       LocalStrategy = require('passport-local')


// Setup JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret 
};

// const localFields =
const localLogin = new LocalStrategy( {
    usernameField:'email'
}, (email, password, done) => {
    User.findOne({email:email}, (err, usr) => {
        if(err) return done(err);

        if(!usr){
            return done(null, false)
        }
        usr.comparePassword(password, (err, match) => {
            if(err) return done(err);

            if(!match) return done(null, false);

            return done(null, usr)
        })
    })
})


const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if(err) return done(err, false);

        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    })
})

passport.use(jwtLogin);
passport.use(localLogin);