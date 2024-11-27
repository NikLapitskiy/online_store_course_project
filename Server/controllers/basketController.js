const {Basket, BasketProduct, Product, ProductInfo, Size, Img, Review} = require('../models/models');
const {UserOrder,OrderInfo, OrderProduct} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {  
    async getAll(req, res){ 
        const user = req.user;
        const basket = await Basket.findOne({
            where: {userId : user.id}
        });
        const basketProducts = await BasketProduct.findAll({
            where: {basketId: basket.id},
        });
        let models = [];
        if(basketProducts && basketProducts.length > 0){
            for(let i = 0 ; i < basketProducts.length; i++){
                let model = await Product.findOne({
                    where: {id: basketProducts[i].productId},
                    include: [{model: ProductInfo}, {model: Size, as: 'size', where: {sizeName: basketProducts[i].targetSize}}, {model: Img, as: "img"}],
                })
                models[i] = model;
            }
        }
        const products = models;

        const userOrders = await UserOrder.findAll({
            where: {userId: user.id},
            include: [
                {model: OrderProduct, as: 'orderProduct', 
                    include: [{model: Product, 
                        include: [{model: ProductInfo}]
                    }
                ]},
                {model: OrderInfo},  
            ]
        })
        let message;
        if(!userOrders || userOrders.length == 0){
            message = "Вы еще не совершали заказы!";
        }
        return res.render('basket', {
            title: 'Корзина',
            products,
            user,
            userOrders,
            message,
        })
    }
    async deleteFromBasket(req, res){
        const {id} = req.body;
        if(id){
            await BasketProduct.destroy({
                where: {productId: id}
            });
        }
        // res.json({message: "Объект удален из корзины"});
        res.redirect('basket');
    }
    async createOrder(req,res){
        const user = req.user;
        const {fullName, phone, adress, postIndex, delivery, comment} = req.body;

        const basket = await Basket.findOne({
            where: {userId: user.id}
        });
        const basketProducts = await BasketProduct.findAll({
            where: {basketId: basket.id}
        });
        let models = [];
        if(basketProducts && basketProducts.length > 0){
            for(let i = 0 ; i < basketProducts.length; i++){
                let model = await Product.findOne({
                    where: {id: basketProducts[i].productId},
                })
                models[i] = model;
            }
            const userOrder = await UserOrder.create({
                userId: user.id
            });
            const orderInfo = await OrderInfo.create({
                fullName: fullName,
                email: user.email,
                phone: phone,
                adress: adress,
                postIndex: postIndex,
                delivery: delivery,
                comment: comment,
                userOrderId: userOrder.id
            });
            const products = models;
            if(products && products.length > 0){
                for(let i = 0; i < products.length; i++){
                    const orderProduct = await OrderProduct.create({
                        userOrderId: userOrder.id,
                        productId: products[i].id
                    });
                }
            }
            return res.json({message: "Заказ поступил в обработку!"});
        }
        else {
            return res.json({message: "В корзине нет товаров, выберите товар в каталоге!"});
        }
    }
    async createReview(req,res){
        const user = req.user;
        const {text} = req.body;
        const review = await Review.create({
            text: text,
            userId: user.id
        })
        return res.json({message: "Отзыв успешно отправлен!"});
    }
}

module.exports = new BasketController();