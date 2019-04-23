const servingData = require('./controller/servingData')
const authentication = require('./controller/authentication'),
    passportService = require('./services/passport'),
    passport = require('passport')


const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session:false})

module.exports = app =>  {
        app.get('/', requireAuth, servingData.servingData)
        app.post('/signin', requireSignIn, authentication.signin)
        app.post('/signup', authentication.signup),
        app.get('/ability/:id',requireAuth, servingData.getOneAbility)
}