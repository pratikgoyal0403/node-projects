const express = require('express');

const router = express.Router();

const appController = require('../controllers/appController');
const authMiddleware = require('../middleware/auth');

router.get('/', appController.getHome);
router.get('/meetups', appController.getMeetups);
router.get('/meetups/:id', authMiddleware,appController.getMeetup)
router.get('/create-meetup', authMiddleware, appController.getCreateMeetupPage);
router.post('/create-meetup', authMiddleware, appController.postCreateMeetup);
router.get('/profile', authMiddleware, appController.getProfile);

module.exports = router;