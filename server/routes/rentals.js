const express = require('express');
const Rental = require('../models/rental');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/secret', userController.authMiddleware, (req, res) => {
    res.json({ "secret": true });
});

router.get('/', (req, res) => {
    Rental.find({}, (err, foundRentals) => {
        res.json(foundRentals);
    });
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;
    Rental.findById(rentalId, (err, foundRental) => {
        if (err) {
            res.status(422).send({ errors: [{ title: 'Rental Error!!!', details: 'Could not find rental' }] });
        }
        res.json(foundRental);
    });
});

module.exports = router;