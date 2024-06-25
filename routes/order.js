const router = require('express').Router();
const orderController = require('../contollers/order_controller');
const authToken = require('../middleware/auth');

router.get('/', authToken, orderController.getOrders);

module.exports = router;