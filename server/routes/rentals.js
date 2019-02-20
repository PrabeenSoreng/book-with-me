const express = require('express');
const Rental = require('../models/rental');
const User = require('../models/user');
const userController = require('../controllers/users');
const { normalizeErrors } = require('../helpers/mongoose');

const router = express.Router();

router.get('/secret', userController.authMiddleware, (req, res) => {
    res.json({ "secret": true });
});

router.get('/manage', userController.authMiddleware, (req, res) => {
    const user = res.locals.user;

    Rental.where({ user })
        .populate('bookings')
        .exec((err, foundRentals) => {
            if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });
            return res.json(foundRentals);
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

router.get('/', (req, res) => {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {};
    Rental.find(query)
        .select('-bookings')
        .exec(function(err, foundRental) {
            if (err)
                return res.status(422).send({ errors: normalizeErrors(err.errors) });
            if (city && foundRental.length === 0)
                return res.status(422).send({
                    errors: [{ title: 'No Rentals Found', details: `There are no rentals for city ${city}` }]
                });
            return res.json(foundRental);
        });
});

router.post('/', userController.authMiddleware, (req, res) => {
    const { title, city, street, category, image, shared, bodrooms, description, dailyRate } = req.body;
    const user = res.locals.user;

    const rental = new Rental({ title, city, street, category, image, shared, bodrooms, description, dailyRate });
    rental.user = user;
    Rental.create(rental, function(err, newRental) {
        if (err)
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function() {});
        return res.json(newRental);
    });
});

router.delete("/:id", userController.authMiddleware, (req, res) => {
    const user = res.locals.user;
    Rental.findById(req.params.id)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: { startAt: { $gt: new Date() } }
        })
        .exec((err, foundRental) => {
            if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });
            if (user.id !== foundRental.user.id)
                return res.send({
                    errors: [{ title: 'Invalid User!', details: 'You are not rental owner!' }]
                });
            if (foundRental.bookings.length > 0)
                return res.send({
                    errors: [{ title: 'Active Bookings!', details: 'Cannot delete rental with active bookings!' }]
                });
            foundRental.remove((err) => {
                if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });
            });
            return res.json({ status: 'Deleted!' });
        })
});

module.exports = router;