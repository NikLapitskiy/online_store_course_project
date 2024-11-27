const Router = require('express');
const getHighRatingProduct = require('../controllers/mainController');
const router = new Router();
const {Review, User} = require('../models/models');

router.get('/', getHighRatingProduct);

// роуты страниц с информацией

router.get('/info', async (req, res) => {
    const reviews = await Review.findAll({
        include: [{model: User}]
    });
    res.render('info', {
        title: 'Информация',
        reviews
    })
})

router.get('/contacts', (req,res) => {
    res.render('contacts', {
        title: 'Контакты'
    })
})

router.get('/delivery', (req,res) =>{
    res.render('delivery', {
        title: "Доставка и оплата"
    })
})

module.exports = router;