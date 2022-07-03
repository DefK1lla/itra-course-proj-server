const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT, DB_URI } = require('./utils/config');
const router = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
   try {
      await mongoose.connect(DB_URI);

      app.listen(PORT, () => {
         console.log('Server started', PORT);
      });

   } catch (e) {
      console.log(e)
   }
}

start();