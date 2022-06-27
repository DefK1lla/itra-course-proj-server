const { Schema, model, ObjectId } = require('mongoose');

const Collection = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imgSrc: { type: String, required: false },
    fields: [{ title: { type: String }, type: { type: String } }],
    theme: { type: ObjectId, ref: 'Theme', required: true },
    timestamp: { type: Number, required: true, default: Date.now },
    user: { type: ObjectId, ref: 'User', required: true, index: true }
});

module.exports = model('Collection', Collection);