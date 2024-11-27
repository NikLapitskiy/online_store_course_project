const {Basket, BasketProduct, Product, ProductInfo, Size, Img, Type, Brand, Review} = require('../models/models');
const {User, UserOrder,OrderInfo, OrderProduct} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class AdminController {  
    async getAll(req,res){
        const products = await Product.findAll({
            include: [{model: ProductInfo}]
        });
        const types = await Type.findAll();
        const brands = await Brand.findAll();
        const imgs = await Img.findAll();
        const sizes = await Size.findAll();
        const users = await User.findAll();
        const orders = await UserOrder.findAll({
            include: [{model: OrderInfo}]
        })
        const reviews = await Review.findAll();
        res.render('admin', {
            title: "Админ панель",
            products,
            types,
            brands,
            imgs,
            sizes,
            orders,
            reviews,
            users
        });
    }
    async addProduct(req,res){
        const {name, price, typeId, brandId, title, description} = req.body;
        const product = await Product.create({
                name: name,
                price: price,
                typeId: typeId,
                brandId: brandId,
        });
        if(product){
            const productinfo = await ProductInfo.create({
                title: title,
                description: description,
                productId: product.id
            });
            return res.json({message: "Товар успешно добавлен!"});
        }
        else return res.json({message: "Товар не добавлен!"});
    }
    async addType(req,res){
        const {name} = req.body;
        const type = await Type.create({
            name: name
        })
        if(type){
            return res.json({message: "Тип успешно создан!"});
        }
        else return res.json({message: "Тип не добавлен!"});
    }
    async addBrand(req,res){
        const {name} = req.body;
        const brand = await Brand.create({
            name: name
        })
        if(brand){
            return res.json({message: "Бренд успешно создан!"});
        }
        else return res.json({message: "Бренд не добавлен!"});
    }
    async addImg(req,res){
        const {img} = req.files;
        const {productId} = req.body;
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'public/resource/products', fileName));
        const imgLink = '/resource/products/' + fileName;
        const productImg = await Img.create({
            imgLink: imgLink,
            productId: productId
        })
        if(productImg){
            return res.json({message: "Картинка успешно добавлена!"});
        }
        else return res.json({message: "Картинка не добавлена!"});
    }
    async addSize(req,res){
        const {sizeName, productId} = req.body;
        const product = await Product.findOne({
            where: {id: productId}
        })
        if(product){
            const size = await Size.create({
            sizeName: sizeName,
            productId: product.id
            });
            if(size){
                return res.json({message: "Размер успешно создан!"});
            }
            else return res.json({message: "Размер не добавлен!"});
        }
    }
    async updateProduct(req,res){
        const {id, name, price, typeId, brandId, title, description} = req.body;
        const product = await Product.findOne({
                where: {  
                    id: id, 
                }
        });
        if(product){
            product.name = name;
            product.price = price;
            product.typeId = typeId;
            product.brandId = brandId;
            await product.save();
            const productinfo = await ProductInfo.findOne({
                where: {
                    productId: product.id
                }
            });
            if(productinfo){
                productinfo.title = title;
                productinfo.description = description;
                await productinfo.save();
                return res.json({message: "Товар обновлен!"});
            }
        }
        else return res.json({message: "Товар не найден!"});
    }
    async updateUser(req,res){
        const {id, role} = req.body;
        const user = await User.findOne({
                where: {  
                    id: id, 
                }
        });
        if(user){
            user.role = role;
            await user.save();
            return res.json({message: "Пользователь обновлен!"});
            }
        else return res.json({message: "Пользователь не найден!"});
    }
    async deleteProduct(req,res){
        const {id} = req.body;
        const product = await Product.findOne({
            where: {id: id}
        })
        if(product){
            const productInfo = await ProductInfo.findOne({
                where: {productId: product.id}
            })
            const imgs = await Img.findAll({
                where: {productId: product.id}
            }) 
            const sizes = await Size.findAll({
                where: {productId: product.id}
            })
            if(productInfo && imgs && sizes) {
                await product.destroy();
                await productInfo.destroy();
                await imgs.destroy();
                await sizes.destroy();
                return res.json({message: "Товар удален из БД"});
            }
            return res.json({message: "Связанные данные не найдены!"})
        }
        return res.json({message: "Продукт не найден"});
    }
    async deleteType(req,res){
        const {id} = req.body;
        const type = await Type.findOne({
            where: {id: id}
        })
        if(type){
            await type.destroy();
            return res.json({message: "Тип удален из БД"});
        }
        return res.json({message: "Тип не найден"});
    }
    async deleteBrand(req,res){
        const {id} = req.body;
        const brand = await Brand.findOne({
            where: {id: id}
        })
        if(brand){
            await brand.destroy();
            return res.json({message: "Бренд удален из БД"});
        }
        return res.json({message: "Бренд не найден"});
    }
    async deleteImg(req,res){
        const {id} = req.body;
        const img = await Img.findOne({
            where: {id: id}
        })
        if(img){
            await img.destroy();
            return res.json({message: "Картинка товара удалена из БД"});
        }
        return res.json({message: "Картинка товара не найдена"});
    }
    async deleteSize(req,res){
        const {id} = req.body;
        const size = await Size.findOne({
            where: {id: id}
        })
        if(size){
            await size.destroy();
            return res.json({message: "Размер товара удален из БД"});
        }
        return res.json({message: "Размер товара не найдена"});
    }
    async deleteOrder(req,res){
        const {id} = req.body;
        const order = await UserOrder.findOne({
            where: {id: id}
        })
        if(order){
            await order.destroy();
            return res.json({message: "Заказ удален из БД"});
        }
        return res.json({message: "Заказ не найден"});
    }
    async deleteReview(req,res){
        const {id} = req.body;
        const review = await Review.findOne({
            where: {id: id}
        })
        if(review){
            await review.destroy();
            return res.json({message: "Отзыв удален из БД"});
        }
        return res.json({message: "Отзыв не найден"});
    }
    async deleteUser(req,res){
        const {id} = req.body;
        const user = await User.findOne({
                where: {  
                    id: id, 
                }
        });
        if(user){
            await user.destroy();
            return res.json({message: "Пользователь удален!"});
            }
        else return res.json({message: "Пользователь не найден!"});
    }
}

module.exports = new AdminController();