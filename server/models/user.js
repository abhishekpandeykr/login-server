const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

// define the model

const userSchema = new Schema({
    email: {type: String, unique:true, lowercase:true},
    password: String
});

// This is for saving the password encrypted
// Before saving a model, run this function
userSchema.pre('save', function(next){
    // get access to the user model
    const user = this;

    // generate a salt, then run a callback
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        // by combining password and salt we will get hash value
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        })
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) {return cb(err);}

        cb(null, isMatch)
    })
}


// Create the model class
const model = mongoose.model('user', userSchema);


module.exports = model;