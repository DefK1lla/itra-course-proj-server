const { Schema, model, ObjectId } = require('mongoose');

const Like = new Schema({
   itemRef: { type: ObjectId, ref: 'Item', required: true, index: true },
   userRef: { type: ObjectId, ref: 'User', required: true, index: true }
});

Like.index({ item_id: 1, user_id: 1 });

module.exports = model('Like', Like);