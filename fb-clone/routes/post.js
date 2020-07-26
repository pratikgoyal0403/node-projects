const express = require('express');

const router = express.Router();

const postController = require('../controller/post');
const isAuth = require('../middleware/is-auth');

router.get('/posts', isAuth, postController.getPosts);
router.post('/post', postController.postPost);
router.post('/comment', postController.postComment);
// router.get('/post/:userId', postController.getUserSpecificPosts);

module.exports = router;