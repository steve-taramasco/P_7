const express     = require('express');
const router      = express.Router();
const auth        = require('../middlewares/auth');
const postCtrl    = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl    = require('../controllers/like');
const multer      = require('../middlewares/multer_config');

    // Posts //
    
router.get('/', auth, postCtrl.getPosts);
router.post('/', auth, multer, postCtrl.createPost);    //multer
router.get('/:id', auth, postCtrl.getPost);
router.delete('/:id', auth, postCtrl.deletePost);

    // Comments //

router.post('/:id/comment', auth, commentCtrl.createComment);
router.get('/:id/comment', auth, commentCtrl.getComments);

    //  Likes //

router.post('/:id/like', auth, likeCtrl.postLike);
router.get('/:id/like', auth, likeCtrl.getLikes)


module.exports = router;