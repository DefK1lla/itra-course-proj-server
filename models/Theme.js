const { Schema, model } = require('mongoose');

const Theme = new Schema({
   title: { 
      en: { type: String, required: true, unique: true, index: true  },
      ru: { type: String, required: true, unique: true, index: true  }
   }
});

module.exports = model('Theme', Theme);