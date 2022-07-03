const { Schema, model } = require('mongoose');

const Tag = new Schema({
   title: { type: String, required: true, unique: true, index: true }
});

module.exports = model('Tag', Tag);