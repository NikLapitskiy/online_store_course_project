const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');


const generateJwt = (id, userName, email, role) => {
    return jwt.sign(
        {id, userName, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );
}

class UserController {
    async registration(req, res, next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Ошибка при регистрации!", errors});
        }
        const {userName, email, password, role} = req.body;
        if(!userName || !email || !password){
            return next(ApiError.badRequest('Неверное имя пользователя, email или пароль!'));
        }
        const candidate = await User.findOne({where: {userName, email}});
        if(candidate){
            return next(ApiError.badRequest('Пользователь с такими данными уже существует!'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({userName, email, password: hashPassword, role});
        const basket = await Basket.create({userId: user.id});
        const token = generateJwt(user.id, user.userName, user.email, user.role);
        res.cookie('token', token, {httpOnly: false});
        // res.json({success: true});
        res.redirect('../');
        // return res.json({token});
    }
    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ApiError.internal('Пользователь не найден!'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль!'));
        }
        const token = generateJwt(user.id, user.userName, user.email, user.role);
        res.cookie('token', token, {httpOnly: false});
        res.cookie('role', user.role, {httpOnly: false});
        res.redirect('../');
    }

    // async check(req,res, next){
    //     const token = generateJwt(req.user.id, req.user.userName, req.user.email, req.user.role);
    //     res.cookie('token', token, {httpOnly: false});
    //     // res.json({success: true});
    //     res.redirect('../');
    //     // return res.json({token});
    // }
}

module.exports = new UserController();