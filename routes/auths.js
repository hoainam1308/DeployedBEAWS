const {Login, Register, GgoogleLogin, Logout} = require('../controllers/authController');
const express = require('express');
const router = express.Router();

// POST login
router.post('/login', Login);
// POST register
router.post('/register', Register);
// POST Google login
router.post('/google-login', GgoogleLogin);
// POST logout
router.post('/logout', Logout);

module.exports = router;