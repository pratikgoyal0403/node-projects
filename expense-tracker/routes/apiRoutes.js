const express = require('express');
const apiController = require('../controller/api');

const router = express.Router();


router.get('/entries/:userId', apiController.getEntries);
router.post('/entries/:userId', apiController.postValue);

module.exports = router;