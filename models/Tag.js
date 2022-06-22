const { Schema, model, ObjectId } = require('mongoose');

const Tag = new Schema({
    title: { type: String, index: true },
    item_ids: [{ type: ObjectId, ref: 'Item', index: true }]
});


module.exports = model('Tag', Tag);