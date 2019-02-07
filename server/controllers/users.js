const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/dev');
const { normalizeErrors } = require('../helpers/mongoose');

exports.auth = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({
            errors: [{ title: 'Data missing!', details: 'Provide email and password.' }]
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err)
            return res.status(422).send({ errors: normalizeErrors(err.errors) });

        if (!user) {
            return res.status(422).send({
                errors: [{ title: 'Invalid User!', details: 'User does not exist.' }]
            });
        }

        if (user.hasSamePassword(password)) {
            // return JWT token
            const token = jwt.sign({
                userId: user._id,
                username: user.username
            }, config.SECRET, { expiresIn: '1h' });

            return res.json(token);
        } else {
            return res.status(422).send({
                errors: [{ title: 'Wrong Data!', details: 'Wrong email or password.' }]
            });
        }
    });
}

exports.register = (req, res) => {
    const { username, email, password, cpassword } = req.body;

    if (!email || !password) {
        return res.status(422).send({
            errors: [{ title: 'Data missing!', detail: 'Provide email and password.' }]
        });
    }

    if (password !== cpassword) {
        return res.status(422).send({
            errors: [{ title: 'Invalid password!', details: 'Password is not same as confirmation' }]
        });
    }

    User.findOne({ email }, (err, existingUser) => {
        if (err)
            return res.status(422).send({ errors: normalizeErrors(err.errors) });

        if (existingUser) {
            return res.status(422).send({
                errors: [{ title: 'Invalid email!', details: 'User with this email already exists' }]
            });
        }
    });

    const user = new User({
        username,
        email,
        password
    });
    user.save(err => {
        if (err)
            return res.status(422).send({ errors: normalizeErrors(err.errors) });

        return res.status(200).json({ "Registered": true });
    });
}

exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        const user = parseToken(token);

        User.findById(user.userId, (err, user) => {
            if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });
            if (user) {
                res.locals.user = user;
                next();
            } else {
                return res.status(401).send({
                    errors: [{ title: 'Now Authorized!', details: 'You need to login to get access.' }]
                });
            }
        });
    } else {
        return res.status(401).send({
            errors: [{ title: 'Not Authorized!', details: 'You need to login to get access.' }]
        });
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}