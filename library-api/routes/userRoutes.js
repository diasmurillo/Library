const express = require('express');
const router = express.Router();
const { register, login, profile, updateProfile, deleteAccount, getAllUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly'); 

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);
router.put('/profile', auth, updateProfile);
router.delete('/profile', auth, deleteAccount);
router.get('/all', auth, adminOnly, getAllUsers);

module.exports = router;