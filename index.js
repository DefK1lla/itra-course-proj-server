const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { port, DB_URI } = require('./utils/config');
const router = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));

app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(DB_URI);

    app.listen(port, () => {
      console.log('Server started', port);
    });

  } catch (e) {
    console.log(e)
  }
}

start();