const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const { use } = require('../routes/product');

module.exports = {
    createUser: async (req,res)=>{
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser) return res.status(400).json({msg: 'User already exists'});

        try {
            const user = new User(_.pick(req.body,['name', 'email', 'password', 'location']));
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            const token = user.generateAuthToken()
            res.header('x-auth-token', token).status(201).json({msg: 'User successfuly created'});
        } catch (error) {
            console.log(error);
            res.status(500).json('Something went wrong');
        }
    },

    loginUser: async (req,res) =>{
        const {error} = validateLogin(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const existingUser = await User.findOne({email: req.body.email});
        if(!existingUser) return res.status(400).json({msg: 'Invalid details'});

        const isValid = await bcrypt.compare(req.body.password, existingUser.password);
        if(!isValid) return res.status(400).json('Invalid details');
        try {
            const token = existingUser.generateAuthToken();
            res.status(200).json({ user:_.pick(existingUser,['name', 'email', 'location']),  token: token}); 
        } catch (error) {
            console.log(error);
            res.status(500).json('Something went wrong'); 
        }
    }
}



function validate(user){
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        location: Joi.string()
    });
    return schema.validate(user);

}

function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(user);
}