const Router = require('express');
const router = new Router();
const managerController = require('../controllers/managerController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('MANAGER'), managerController.updateStatus);
router.get('/',checkRole("MANAGER"), managerController.getAllOrders)

module.exports = router;