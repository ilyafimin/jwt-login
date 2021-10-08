const jwt = require('jsonwebtoken')

function authVerify(request, response, next) {

    let token = request.header('auth_token')

    if (!token) {
        response.status(401).send('Access Denied')
    }

    try {
        let verify = jwt.verify(token, process.env.SECRET_KEY)
        request.user = verify
        next()
        
    } catch(error) {
        response.status(200).send(error.message)
    }

}

module.exports = authVerify