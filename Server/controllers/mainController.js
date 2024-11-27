const { Sequelize } = require('../db');
const ApiError = require('../error/ApiError');
const {Product, ProductInfo, Img} = require('../models/models');
const Op = Sequelize.Op;

module.exports = async function getHighRatingProduct(req,res){
    const products = await Product.findAll(
        {
            order: [['rating', 'DESC']],
            include: [{model: ProductInfo}, {model: Img, as: "img"}]
        }
    )
    return res.render('index', {
        title: 'Главная',
        products,
    });
}