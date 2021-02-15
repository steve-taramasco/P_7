const express  = require('express');
const router   = express.Router();
const postCtrl = require('../controllers/post');
const auth     = require('../middleware/auth');


    // Posts route //

router.get('/', auth, postCtrl.getPosts);
router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getPost);
router.delete('/:id', auth, postCtrl.deletePost);

    //  Likes route //

router.post('/:id/like', auth, postCtrl.postLike);
router.get('/:id/like', auth, postCtrl.getLikes)



module.exports = router;