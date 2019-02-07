const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.post('/auth', userController.auth);

router.post('/register', userController.register);

module.exports = router;