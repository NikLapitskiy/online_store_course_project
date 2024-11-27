const {Sequelize} = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Имя пользователя
    process.env.DB_PASSWORD, // Пароль
    {
        dialect: 'mysql',
        host: process.env.DB_HOST, // Хост
        post: process.env.DB_PORT, // Порт ДБ
    }
)