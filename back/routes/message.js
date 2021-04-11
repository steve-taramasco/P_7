const express     = require('express');
const router      = express.Router();
const auth        = require('../middlewares/auth');
const multer      = require('../middlewares/multer_config');
const messageCtrl = require('../controllers/message');
const commentCtrl = require('../controllers/comment');
const likeCtrl    = require('../controllers/like');

    // messages //
    
router.post('/new', auth, multer, messageCtrl.createMessage);
router.get('/', messageCtrl.getMessages);
router.get('/:id', auth, messageCtrl.getMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

    // Comments //

router.post('/:id/comment', auth, commentCtrl.createComment);
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment);

    //  Likes //

router.post('/:id/like', auth, likeCtrl.postLike);

module.exports = router;