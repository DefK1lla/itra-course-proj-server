const { Schema, model, ObjectId } = require('mongoose');

const Item = new Schema({
   title: { type: String, required: true, index: true },
   fields: [{
      fieldRef: { type: ObjectId, ref: 'Field', required: true, index: true },
      value: { type: String, required: true, index: true }
   }],
   tags: [{ type: String,  index: true }],
   likesCount: { type: Number, required: true, default: 0, index: true },
   timestamp: { type: Number, required: true, default: Date.now },
   collectionRef: { type: ObjectId, ref: 'Collection', required: true, index: true },
   userRef: { type: ObjectId, ref: 'User', required: true, index: true }
});

module.exports = model('Item', Item);