const router = require('express').Router();
const productController = require('../contollers/product_controller');
router.get('/search/:key', productController.searchProduct);
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

module.exports = router;