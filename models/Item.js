const { Schema, model, ObjectId } = require('mongoose');

const Item = new Schema({
    title: { type: String },
    info: [{ title: { type: String }, type: { type: String }, value: { type: String, index: true } }],
    tags: { type: ObjectId, ref: 'Tag', index: true },
    timestamp: { type: Number, required: true, default: Date.now },
    collection: { type: ObjectId, ref: 'Collection', required: true, index: true },
    user: { type: ObjectId, ref: 'User', required: true, index: true }
});

module.exports = model('Item', Item);