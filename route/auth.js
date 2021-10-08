const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/User')
const { RegisterSchema, LoginSchema } = require('../utilits/joi')

router.post('/register', async (request, response) => {

    //Checking if user already exists
    if (await User.findOne({'email' : request.body.email })) {
        response.status(400).send('Email already exists')
    }

    let validation = RegisterSchema.validate(request.body)

    if (!validation['error']) {

        let hashSalt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(request.body.password, hashSalt)

        const user = new User({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword,
        })

        try {

            const savedUser = await user.save()
            response.send({ user_id: user._id })

        } catch (error) {
            response.status(400).send(error.message)
        }

    } else {
        response.status(400).send(validation['error']['details'][0]['message'])
    }
})

router.post('/login', async (request, response) => {

    let validate = LoginSchema.validate(request.body);
    
    if (!validate['error']) {

        const user = await User.findOne({ email: request.body.email }) 
        if (user) { 

            let password = await bcrypt.compare(request.body.password, user.password)
            if (!password) return response.status(400).send('Invalid Password')
            
            let token = jwt.sign({ _id : user._id }, process.env.SECRET_KEY)
            response.header('auth_token', token)
            response.send(token)


        } else {
            response.status(400).send('Email is incorrect')
        }

    } else {
        response.status(400).send(validate['error']['details'][0]['message'])
    }

})

module.exports = router