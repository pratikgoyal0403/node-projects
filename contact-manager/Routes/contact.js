
const express = require('express');

const router = express.Router();

const contactController =  require('../controllers/contact');

router.get('/contact/:userId', contactController.getContacts);
router.post('/contact/:userId', contactController.postContact);
router.put('/contact/:userId', contactController.updateContact);
router.delete('/contact/:userId', contactController.deleteContact);

module.exports = router;