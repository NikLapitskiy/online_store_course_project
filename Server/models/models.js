const sequelize = require('../db');
const {DataTypes} = require('sequelize');

// описание структуры бд 

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userName: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true, },
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    }
);

const Review = sequelize.define('review', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING, allowNull: false}
  },
  {
  freezeTableName: true,

  createdAt: false,

  updatedAt: false,
  }
)

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const UserOrder = sequelize.define('user_order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  status: {type: DataTypes.STRING, defaultValue: "В обработке"}
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
})

const OrderInfo = sequelize.define('order_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  fullName: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
  phone: {type: DataTypes.STRING, allowNull: false},
  adress: {type: DataTypes.STRING, allowNull: false},
  postIndex: {type: DataTypes.STRING, allowNull: false},
  delivery: {type: DataTypes.STRING, allowNull: false},
  comment: {type: DataTypes.STRING, allowNull: true},
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
})

const OrderProduct = sequelize.define('order_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
},
{
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    targetSize: {type: DataTypes.STRING}
    },
    {
        freezeTableName: true,
    
        createdAt: false,
    
        updatedAt: false,
    });

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    // img: {type: DataTypes.STRING, allowNull: false}
    },
    {
      freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.FLOAT, allowNull: false}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const Img = sequelize.define('img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    imgLink: {type: DataTypes.STRING, allowNull: false}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sizeName: {type: DataTypes.STRING, defaultValue: "Стандартный"},
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
    });

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
    },
    {
        freezeTableName: true,
      
      createdAt: false,
      
      updatedAt: false,
})

User.hasOne(Basket, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Basket.belongsTo(User);

User.hasMany(Rating, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Rating.belongsTo(User);

Basket.hasMany(BasketProduct, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
BasketProduct.belongsTo(Basket);

User.hasMany(UserOrder, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
UserOrder.belongsTo(User);

User.hasMany(Review, {as: 'review', onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Review.belongsTo(User);

UserOrder.hasOne(OrderInfo, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
OrderInfo.belongsTo(UserOrder);

UserOrder.hasMany(OrderProduct, {as: "orderProduct", onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
OrderProduct.belongsTo(UserOrder);

Type.hasMany(Product , {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Product.belongsTo(Type);

Brand.hasMany(Product, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Product.belongsTo(Brand)

Product.hasMany(Rating, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Rating.belongsTo(Product);

Product.hasMany(BasketProduct, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
BasketProduct.belongsTo(Product);

Product.hasMany(OrderProduct, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
OrderProduct.belongsTo(Product);

Product.hasOne(ProductInfo, {onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
ProductInfo.belongsTo(Product);

Type.belongsToMany(Brand, {through: TypeBrand});
Brand.belongsToMany(Type, {through: TypeBrand});

Product.hasMany(Size, {as: 'size', onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Size.belongsTo(Product);

Product.hasMany(Img, {as: "img", onDelete: 'CASCADE',
foreignKey: {
  allowNull: false
}});
Img.belongsTo(Product);

module.exports = {
    User,
    Review,
    Basket,
    BasketProduct,
    UserOrder,
    OrderInfo,
    OrderProduct,
    Product,
    Type,
    Brand,
    Size,
    Img,
    Rating,
    TypeBrand,
    ProductInfo
}