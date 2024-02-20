// import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log('inside the jwt middleware');
    
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token)
     
    try{
        const jwtReponse = jwt.verify(token,"superSecretKey12345")
        console.log(jwtReponse);
        req.payload = jwtReponse.userId
        next()
    }catch(err){
        res.status(401).json('Authorization failed..... Please Login')
    }


}
module.exports = jwtMiddleware