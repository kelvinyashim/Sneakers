const router = require('express').Router();
const userController = require('../contollers/user_controller');
const authToken = require('../middleware/auth');

router.get('/', authToken, userController.getUser);
router.delete('/', authToken, userController.deleteUser);

module.exports = router;