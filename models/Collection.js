const { Schema, model, ObjectId } = require('mongoose');

const Collection = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imgSrc: { type: String, required: false },
    fields: [{ title: { type: String }, type: { type: String } }],
    theme: { type: String, required: true },
    user_id: { type: ObjectId, ref: 'User', index: true }
});

module.exports = model('Collection', Collection);