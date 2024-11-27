const Router = require('express');
const router = new Router();
const adminController = require('../controllers/adminController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/addProduct', checkRole('ADMIN'), adminController.addProduct);
router.post('/addType', checkRole('ADMIN'), adminController.addType);
router.post('/addBrand', checkRole('ADMIN'), adminController.addBrand);
router.post('/addImg', checkRole('ADMIN'), adminController.addImg);
router.post('/addSize', checkRole('ADMIN'), adminController.addSize);
router.post('/updateProduct', checkRole('ADMIN'), adminController.updateProduct);
router.post('/updateUser', checkRole('ADMIN'), adminController.updateUser);
router.post('/deleteProduct', checkRole('ADMIN'), adminController.deleteProduct);
router.post('/deleteType', checkRole('ADMIN'), adminController.deleteType);
router.post('/deleteBrand', checkRole('ADMIN'), adminController.deleteBrand);
router.post('/deleteImg', checkRole('ADMIN'), adminController.deleteImg);
router.post('/deleteSize', checkRole('ADMIN'), adminController.deleteSize);
router.post('/deleteOrder', checkRole('ADMIN'), adminController.deleteOrder);
router.post('/deleteReview', checkRole('ADMIN'), adminController.deleteReview);
router.post('/deleteUser', checkRole('ADMIN'), adminController.deleteUser);

router.get('/', checkRole("ADMIN"), adminController.getAll);

module.exports = router;