const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');
const isAuth = require('../middleware/is-auth');


router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/user', isAuth, authController.getUserInfo);
router.put('/user', authController.updateUserInfo);
router.get('/user/:userId', authController.getUserById);

module.exports = router;