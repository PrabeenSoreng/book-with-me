const express = require('express');
const Rental = require('../models/rental');

const router = express.Router();

router.get('/', function(req, res) {
    Rental.find({}, (err, foundRentals) => {
        res.json(foundRentals);
    });
});

router.get('/:id', function(req, res) {
    const rentalId = req.params.id;
    Rental.findById(rentalId, (err, foundRental) => {
        if (err) {
            res.status(422).send({ errors: [{ title: 'Rental Error!!!', details: 'Could not find rental' }] });
        }
        res.json(foundRental);
    });
});

module.exports = router;