const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

module.exports = router;