const express  = require('express');
const router   = express.Router();
const userCtrl = require('../controllers/user');
const auth     = require('../middlewares/auth');

router.post('/signup', userCtrl.signup);    
router.post('/login', userCtrl.login);

router.put('/me', auth, userCtrl.modify);
router.delete('/me', auth, userCtrl.delete);
router.get('/me', auth, userCtrl.getUser);

router.get('/', auth, userCtrl.getUsers);      

module.exports = router;