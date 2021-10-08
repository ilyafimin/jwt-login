const Joi = require('@hapi/joi')

const RegisterSchema = Joi.object({

    name: Joi.string()
        .min(6)
        .max(20)
        .required(),

    email: Joi.string()
        .required()
        .email(),

    password: Joi.string()
        .min(6)
        .required()

})

const LoginSchema = Joi.object({

    email: Joi.string()
        .required()
        .email(),

    password: Joi.string()
        .min(6)
        .required()

})


module.exports.RegisterSchema = RegisterSchema
module.exports.LoginSchema = LoginSchema 