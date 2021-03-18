const jwt =  require('jsonwebtoken');
const config  = require('./config');
 const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const onlyToken = token.slice(7,  token.length)  //bearer onlytoken
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) =>{
            if(err){
                res.status(401).json({message: 'Invalid token'});
            }
            req.user = decode;
            next();
            return
        })
    }else{
        return res.status(401).json({message: 'Token is not supplied'})
    }
}

 const isAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        return next();
    }
    else{
        res.status(401).json({message : 'Admin token is not valid'})
    }
}

module.exports = { isAuth, isAdmin }