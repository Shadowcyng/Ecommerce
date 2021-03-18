const jwt = require('jsonwebtoken')
const config = require('../utill/config')

const getToken = (user) =>{
    
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn : '48h'
    })
    
    }

module.exports = { getToken }