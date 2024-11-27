require('dotenv').config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/models');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // для отправки запросов с браузера
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({}));
app.use('/', router);
app.use(errorHandler);

app.set('view engine', 'ejs');
app.set('views', 'views');

const start = async() => {
    try{
        await sequelize.authenticate(); //подключение к бд
        await sequelize.sync(); // сверяет состояние бд со схемой данных бд
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT));
    } catch(e){
        console.log(e);
    }
}

start();