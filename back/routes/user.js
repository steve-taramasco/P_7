const express  = require('express');
const router   = express.Router();
const userCtrl = require('../controllers/user');
const auth     = require('../middlewares/auth');
const multer   = require('../middlewares/multer_config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/password', auth, userCtrl.password);

router.put('/me', multer, auth, userCtrl.modify);
router.delete('/me', auth, userCtrl.delete);
router.get('/me', auth, userCtrl.getUser);

router.get('/', auth, userCtrl.getUsers);

module.exports = router;