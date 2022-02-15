const Joi = require('@hapi/joi');

//Register validation

const registerValidation = (data) => {
    const schema = {
        name : Joi.string().min(2).required(),
        email : Joi.string().min(6).required().email(),
        phone_number : Joi.string().min(6).required(),
        password : Joi.string().min(6)
    }
    return Joi.validate(data,schema);
}

const loginValidation = (data) => {
    const schema = {
        
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6)
    } 
    return Joi.validate(data,schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
