const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createBooking = (req, res) => {
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
    const user = res.locals.user;

    const booking = new Booking({ startAt, endAt, totalPrice, guests, days });
    // res.json({ "booking": "user" });
    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function(err, foundRental) {
            if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });
            if (foundRental.user.equals(user.id))
                return res.status(422).send({
                    errors: [{ title: 'Invalid User!', details: 'Cannot create booking on your rental!' }]
                });

            // Check here for valid booking.
            if (isValidBooking(booking, foundRental)) {
                booking.user = user;
                booking.rental = foundRental;
                foundRental.bookings.push(booking);

                booking.save(function(err) {
                    if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });

                    foundRental.save();
                    User.update({ _id: user.id }, { $push: { bookings: booking } }, function() {});

                    return res.json({ startAt: booking.startAt, endAt: booking.endAt });
                });
            } else {
                return res.status(422).send({
                    errors: [{ title: 'Invalid Booking!', details: 'Chosen dates are already taken.' }]
                });
            }
        });
}

function isValidBooking(proposedBooking, rental) {
    isValid = true;
    if (rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every(function(booking) {
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);

            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);

            return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart))
        });
    }
    return isValid;
}

exports.getUserBookings = (req, res) => {
    const user = res.locals.user;

    Booking
        .where({ user })
        .populate('rental')
        .exec((err, foundBookings) => {
            if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });
            return res.json(foundBookings);
        });
}