const { Schema, model, ObjectId } = require('mongoose');

const Collection = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imgSrc: { type: String, required: false },
    fields: [{ title: { type: String }, type: { type: String } }],
    theme: { type: String, required: true },
    data: { type: Date, required: true, default: Date.now },
    user_id: { type: ObjectId, ref: 'User', required: true, index: true }
});

module.exports = model('Collection', Collection);