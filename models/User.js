const { Schema, model } = require('mongoose');

const User = new Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'USER', index: true },
    status: { type: String, required: true, default: 'active' },
    timestamp: { type: Number, required: true, default: Date.now }
});

module.exports = model('User', User);