const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, basketController.getAll);
router.post('/', authMiddleware, basketController.deleteFromBasket);
router.post('/createOrder', authMiddleware, basketController.createOrder);
router.post('/createReview', authMiddleware, basketController.createReview);

module.exports = router;