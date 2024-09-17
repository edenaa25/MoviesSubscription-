const jwt = require('jsonwebtoken')
const SECRET_KEY = 'edenSecretKey'

const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
};

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
};

module.exports = { generateToken, verifyToken }