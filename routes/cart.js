const router = require('express').Router();
const cartController = require('../contollers/cart_controller');
router.post('/', cartController.addCart);
router.get('/find/', cartController.getCart);
router.delete('/:id', cartController.getCart);

module.exports = router;