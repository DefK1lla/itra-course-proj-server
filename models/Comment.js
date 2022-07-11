const { Schema, model, ObjectId } = require('mongoose');

const Comment = new Schema({
   text: { type: String, required: true },
   timestamp: { type: Number, required: true, default: Date.now },
   itemRef: { type: ObjectId, ref: 'Item', index: true },
   userRef: { type: ObjectId, ref: 'User' }
});

module.exports = model('Comment', Comment);