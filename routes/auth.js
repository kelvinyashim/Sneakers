const router = require('express').Router();
const authController = require('../contollers/auth_controller')

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);

module.exports = router;