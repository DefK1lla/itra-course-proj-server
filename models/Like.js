const { Schema, model, ObjectId } = require('mongoose');

const Like = new Schema({
    item_id: { type: ObjectId, ref: 'Item' },
    user_id: { type: ObjectId, ref: 'User' }
});

Like.index({ item_id: 1, user_id: 1 }, { unique: true });

module.exports = model('Like', Like);