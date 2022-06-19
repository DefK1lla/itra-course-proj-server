const { Schema, model, ObjectId } = require('mongoose');

const Comment = new Schema({
    text: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    item_id: { type: ObjectId, ref: 'Item', index: true },
    user_id: { type: ObjectId, ref: 'User' }
});

module.exports = model('Comment', Comment);