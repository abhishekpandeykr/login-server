const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');


// This function will return the the encrypted the JWT based on secret key and object
function tokenForUser(user){
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat:timeStamp}, config.secret)
}

exports.signup = (req, res, next) =>  {
    const email = req.body.email;
    const pwd = req.body.password
    console.log(email, pwd)

    // res.send(true)
    if(!email || !pwd) {
        return res.status(422).send({"error": "You must provide Username and password"})
    }

    User.findOne({email:email}, (err, extUser) => {
        if(err) return next(err);

        if(extUser){
            return res.status(422).send({error:'Email does exist'})
        }

        const user = new User({
            email:email,
            password:pwd
        });
        user.save((err) => {
            if(err) return next(err);
            res.json({"token": tokenForUser(user)})
        })
    })

}


exports.signin = (req, res, next) => {
    // the user object came in req,user from Passports done callback
    res.send({token:tokenForUser(req.user)});
}