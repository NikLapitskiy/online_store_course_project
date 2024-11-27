const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    if(req.method === "OPTIONS"){
        next();
    }
    try{
        // const token = req.headers.authorization.split(' ')[1] // сначала тип токена, а затем сам токен
        let tokenstr = req.headers.cookie.split(';')[0];
        if(!tokenstr){
            return res.status(401).json({message: "Пользователь не авторизован!"});
        }
        const token = tokenstr.split('=')[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(e){
        res.status(401).json({message: "Пользователь не авторизован!"});
    }
}