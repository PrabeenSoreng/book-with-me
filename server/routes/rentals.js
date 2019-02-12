const express = require('express');
const Rental = require('../models/rental');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/secret', userController.authMiddleware, (req, res) => {
    res.json({ "secret": true });
});

router.get('/', (req, res) => {
    Rental.find({})
        .select('-bookings')
        .exec(function(err, foundRental) {
            return res.json(foundRental);
        });
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function(err, foundRental) {
            if (err) return res.status(422).send({
                errors: [{ title: 'Rental Error!!!', details: 'Could not find rental' }]
            });
            return res.json(foundRental);
        });
});

module.exports = router;