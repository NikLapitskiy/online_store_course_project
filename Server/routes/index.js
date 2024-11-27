const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const pagesRouter = require('./pagesRouter');
const basketRouter = require('./basketRouter');
const adminRouter = require('./adminRouter');
const mangerRouter = require('./managerRouter');

router.use('/', pagesRouter);
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);
router.use('/basket', basketRouter);
router.use('/admin', adminRouter);
router.use('/manager', mangerRouter);

router.use((req, res) => { // если задан неверный url
    res
    .status(404)
    .render('404', {
        title: 'Страница не найдена'
    })
})

module.exports = router;