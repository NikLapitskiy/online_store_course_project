const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try{
            let tokenstr = req.headers.cookie.split(';')[0];
            if(!tokenstr){
                return res.status(401).json({message: "Пользователь не авторизован!"});
            }
            const token = tokenstr.split('=')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role !== role){
                return res.status(403).json({message: "Нет доступа!"});
            }
            // req.message = message;
            req.user = decoded;
            next();
        } catch(e){
            res.status(401).json({message: "Пользователь не авторизован!"});
        }
    }
}