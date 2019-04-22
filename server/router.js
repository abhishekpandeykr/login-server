const authentication = require('./controller/authentication'),
    passportService = require('./services/passport'),
    passport = require('passport')


const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session:false})

module.exports = app =>  {
        app.get('/', requireAuth, (req, res) => {
            res.send({'hi':'There'})
        })
        app.post('/signin', requireSignIn, authentication.signin)
        app.post('/signup', authentication.signup)
}