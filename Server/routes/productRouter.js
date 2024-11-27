const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRole("ADMIN"), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.post('/:id', authMiddleware, productController.toBasket);
router.post('/:id/setRating', authMiddleware, productController.setRating);

module.exports = router;