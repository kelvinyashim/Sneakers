const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {
        type:String,
        required:true,
    },
    location: {type:String, default:'Lagos Nigeria'},

},{timestamps:true});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id : this._id}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);

function validate(user){
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        location: Joi.string()
    });
    return schema.validate(user);
}

module.exports = {User, validate};