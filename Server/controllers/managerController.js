const {Product, ProductInfo} = require('../models/models');
const {UserOrder,OrderInfo, OrderProduct} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize')

class ManagerController {  
    async getAllOrders(req,res){
        const orders = await UserOrder.findAll({
            where: {
                [Op.or]: [{ status: "В обработке" }, { status: "Доставляется" }],
              },
            include: [{model: OrderInfo}, {model: OrderProduct, as: "orderProduct"}]
        });
        res.render('manager', {
            title: "Панель менеджера",
            orders
        })
    }
    async updateStatus(req,res){
        const {id, status} = req.body;
        const userOrder = await UserOrder.findOne({
            where: {id: id}
        })
        if(!userOrder){
            return res.json({message: "Заказ по заданному id не найден"});
        }
        userOrder.status = status;
        await userOrder.save();
        return res.json({message: "Статус заказа обновлен!"});
    }
}

module.exports = new ManagerController();