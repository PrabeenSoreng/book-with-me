const express = require('express');
const userController = require('../controllers/users');
const bookingController = require('../controllers/bookings');

const router = express.Router();

router.post('/', userController.authMiddleware, bookingController.createBooking);

module.exports = router;