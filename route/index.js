const router = require('express').Router()

const authVerify = require('../utilits/verify')

router.get('/', authVerify , (request, response) => {

    return response.json( {
        message: {
            type: 'String',
            length: '12'
        }
    })

})

module.exports = router