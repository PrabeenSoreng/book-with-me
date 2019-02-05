const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const rentalRoutes = require('./routes/rentals');
const FakeDb = require('./fake-db');

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connection successful');
            const fakeDb = new FakeDb();
            fakeDb.seeDb();
        });
    })
    .catch(err => console.log(err));