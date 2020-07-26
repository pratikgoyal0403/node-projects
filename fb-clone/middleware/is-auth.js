const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const token = req.get('Authorization').split(' ')[1];
    // console.log(token);
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'somesuperdupersecret');
        console.log(decodedToken)
    }catch(err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        return res.status(401).json({message: "not authorized"});
    }
    req.userId = decodedToken.userId;
    next();
}