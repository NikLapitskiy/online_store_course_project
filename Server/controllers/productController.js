const { Sequelize } = require('../db');
const ApiError = require('../error/ApiError');
const {Product, ProductInfo, Size, Img} = require('../models/models');
const {Basket, BasketProduct} = require('../models/models');
const {Rating} = require('../models/models');
const {Type, Brand} = require('../models/models');
const Op = Sequelize.Op;

class ProductController {
    async create(req, res, next){
        try{
            let {name, price, brandId, typeId, info, size, img} = req.body;
            const product = await Product.create({name, price, brandId, typeId, size, img});
            
            if(info){
                info = JSON.parse(info);
                info.forEach(i => 
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })   
                )
            }
            return res.json(product);
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }
    async getAll(req, res){
        const brands = await Brand.findAll();
        const types = await Type.findAll();
        let {brandId, typeId, minPrice, maxPrice} = req.query;
        // let page = page || 1;
        // let limit = limit || 16;
        // let offset = page * limit - limit;
        let models;
        if(!brandId && !typeId && !minPrice && !maxPrice){ // без фильтрации
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll({
                include: [{model: ProductInfo}, {model: Img, as: "img"}],
            });
        }
        if(brandId && !typeId && !minPrice && !maxPrice){ // фильтрация по бренду
            // products = await Product.findAndCountAll( {where: {brandId}, limit, offset});
            models = await Product.findAll( {
                where: {brandId},
                include: [{model: ProductInfo}, {model: Img, as: "img"}],
            });
        }
        if(!brandId && typeId && !minPrice && !maxPrice){ // фильтрация по типу
            // products = await Product.findAndCountAll( {where: {typeId}, limit, offset});
            models = await Product.findAll( {
                where: {typeId},
                include: [{model: ProductInfo}, {model: Img, as: "img"}],
            });
        }
        if(brandId && typeId && !minPrice && !maxPrice){ // фильтрация по бренду и типу
            // products = await Product.findAndCountAll( {where: {brandId, typeId}, limit, offset});
            models = await Product.findAll( {
                where: {brandId, typeId},
                include: [{model: ProductInfo}, {model: Img, as: "img"}],
            });
        }
        if(!brandId && !typeId && minPrice && !maxPrice){ // фильтрация по минимальной цене
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.gt]: minPrice
                        }
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                }
            )
        }
        if(!brandId && !typeId && !minPrice && maxPrice){ // фильтрация по максимальной цене
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice
                        }
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(!brandId && typeId && minPrice && !maxPrice){ // фильтрация по минимальной цене и типу
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.gt]: minPrice
                        },
                        typeId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(brandId && !typeId && minPrice && !maxPrice){ // фильтрация по минимальной цене и бренду
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.gt]: minPrice
                        },
                        brandId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(brandId && typeId && minPrice && !maxPrice){ // фильтрация по минимальной цене, типу и бренду
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.gt]: minPrice
                        },
                        typeId,
                        brandId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                
                }
            )
        }
        if(!brandId && typeId && !minPrice && maxPrice){ // фильтрация по максимальной цене и типу
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice
                        },
                        typeId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                   
                }
            )
        }
        if(brandId && !typeId && !minPrice && maxPrice){ // фильтрация по максимальной цене и бренду
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice
                        },
                        brandId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(brandId && typeId && !minPrice && maxPrice){ // фильтрация по максимальной цене, типу и бренду
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice
                        },
                        brandId,
                        typeId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(!brandId && !typeId && minPrice && maxPrice){ // фильтрация по максимальной цене и минимальной цене
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice,
                            [Op.gt]: minPrice
                        },
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(brandId && !typeId && minPrice && maxPrice){ // фильтрация по максимальной цене и минимальной цене и бренду
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice,
                            [Op.gt]: minPrice
                        },
                        brandId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(!brandId && typeId && minPrice && maxPrice){ // фильтрация по максимальной цене и минимальной цене и типу
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice,
                            [Op.gt]: minPrice
                        },
                        typeId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                    
                }
            )
        }
        if(brandId && typeId && minPrice && maxPrice){ // фильтрация по всем параметрам
            // products = await Product.findAndCountAll({limit, offset});
            models = await Product.findAll(
                {
                    where: {
                        price: {
                            [Op.lt]: maxPrice,
                            [Op.gt]: minPrice
                        },
                        typeId,
                        brandId
                    },
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                }
            )
        }
        return res.render('catalog', {
            title: 'Каталог',
            models,
            types,
            brands
        });
    }

    async getOne(req,res){
        const {id} = req.params;
            const product = await Product.findOne(
                {
                    where: {id: id},
                    include: [{model: ProductInfo}, {model: Img, as: "img"}],
                },
            );
            if(product){
                const sizes = await Size.findAll({
                    where: {productId: product.id}
                })
                if(sizes && sizes.length > 0){
                    return res.render('product', {
                        title: product.name,
                        product,
                        sizes
                    });
                }
                else return res.json({message: "Размеры товара не найдены!"});
            }
            else return res.json({message: "Товар не найден!"});
    }
    async toBasket(req,res){
        const {id} = req.params;
        const {targetSize} = req.body;
        const userId = req.user.id;
        const basket = await Basket.findOne(
            {
                where: {userId},
            },
        );
        const basketProducts = await BasketProduct.findAll({
            where: {productId: id, basketId: basket.id}
        })
        if(basketProducts.length > 0){
            return res.json({message: "Данный товар уже добавлен в вашу корзину!"});
        }
        else{
            
            const basket_product = await BasketProduct.create({basketId: basket.id, productId: id, targetSize: targetSize});
            return res.json({message: "Товар добавлен в корзину"});
        }
        
    }
    async setRating(req,res){
        const user = req.user;
        console.log(user.id);
        let {id} = req.params;
        let {rate} = req.body;
        const candidate = await Rating.findOne({
            where: {userId: user.id, productId: id,}
        })
        if(candidate){
            return res.json({message: "Вы уже оценивали этот товар!"})
        }
        const rating = await Rating.create({
            userId: user.id,
            productId: id,
            rate: rate
        })
        const productId = rating.productId;
        const ratings = await Rating.findAll({
            where: {productId: productId}
        })
        const ratingCount = await Rating.count({
            where: {productId: productId}
        })
        let sumRating = 0;
        for(let i = 0; i < ratings.length; i++){
            sumRating += ratings[i].rate
        }
        let productRating = sumRating/ratingCount;
        const product = await Product.findOne({
            where: {id: productId}
        })
        product.rating = productRating;
        await product.save();
        res.json({message: "Вы оценили товар!"});
    }
}

module.exports = new ProductController();