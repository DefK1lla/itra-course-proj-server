const { Schema, model } = require('mongoose');

const Theme = new Schema({
    title: { type: String, required: true, unique: true, index: true }
});

module.exports = model('Theme', Theme);