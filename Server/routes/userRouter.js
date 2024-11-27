const Router = require('express');
const router = new Router();
const {check} = require("express-validator");
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration',[
    check('userName', "Имя пользователя не может быть пустым!").notEmpty(),
    check('password', "Пароль должен быть больше 8 и меньше 16 символов").isLength({min: 8, max: 16})
], userController.registration);

router.get('/registration', (req, res) => {
    res.render('registration', {
        title: "Регистрация"
    })
})

router.post('/login',[
    check('email', "Поле email не должно быть пустым!").notEmpty(),
    check('password', "Пароль должен быть больше 8 и меньше 16 символов").isLength({min: 8, max: 16})
], userController.login);

router.get('/login', (req, res) => {
    res.render('login', {
        title: "Вход"
    })
})

// router.get('/authorization', authMiddleware, userController.check);

module.exports = router;