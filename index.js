const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const router = require('./routes/index');

const PORT = process.env.PORT || config.get('serverPort');
const DB_URL = config.get('dbURL');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(DB_URL);

        app.listen(PORT, () => {
            console.log('Server started', PORT);
        });

    } catch (e) {
        console.log(e)
    }
}

start();