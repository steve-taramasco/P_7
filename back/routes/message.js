const express     = require('express');
const router      = express.Router();
const auth        = require('../middlewares/auth');
const multer      = require('../middlewares/multer_config');
const messageCtrl = require('../controllers/message');
const commentCtrl = require('../controllers/comment');
const likeCtrl    = require('../controllers/like');

    // messages //
    
router.post('/new', auth, multer, messageCtrl.createMessage);   // CREATE
router.get('/', auth, messageCtrl.getMessages);                 // READ (all)
router.get('/:id', auth, messageCtrl.getMessage);               // READ
router.delete('/:id', auth, messageCtrl.deleteMessage);         // DELETE

    // Comments //

router.post('/:id/comment', auth, commentCtrl.createComment);   // CREATE
router.delete('/:id/comment/:id', auth, commentCtrl.deleteComment); // DELETE

    //  Likes //

router.post('/:id/like', auth, likeCtrl.postLike);              // CREATE || DELETE
router.get('/:id/like', auth, likeCtrl.getLikes);               // READ


module.exports = router;