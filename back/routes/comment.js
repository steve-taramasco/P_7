const express     = require('express');
const router      = express.Router();
const commentCtrl = require('../controllers/comment');
const auth        = require('../middleware/auth');

router.post('/:id', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getComments);

module.exports = router;