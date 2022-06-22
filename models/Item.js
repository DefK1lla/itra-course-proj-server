const { Schema, model } = require('mongoose');

const Item = new Schema({
    title: { type: String },
    info: [{ title: { type: String }, type: { type: String }, value: { type: String, index: true } }],
    tags: { type: String, index: true },
    date: { type: Date, required: true, default: Date.now },
    collection_id: { type: ObjectId, ref: 'Collection', index: true },
    user_id: { type: ObjectId, ref: 'User', index: true }
});

module.exports = model('Item', Item);