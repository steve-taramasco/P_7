const express  = require('express');
const router   = express.Router();
const userCtrl = require('../controllers/user');
const auth     = require('../middlewares/auth');

router.post('/signup', userCtrl.signup);    
router.post('/login', userCtrl.login);

router.put('/:id', auth, userCtrl.modify);
router.delete('/:id', auth, userCtrl.delete);
router.get('/:id', auth, userCtrl.getUser); 
router.get('/', auth, userCtrl.getUsers);      

module.exports = router;