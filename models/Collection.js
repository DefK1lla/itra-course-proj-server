const { Schema, model, ObjectId } = require('mongoose');

const Collection = new Schema({
   title: { type: String, required: true },
   description: { type: String, required: false },
   imgSrc: { type: String, required: false },
   theme: { type: String, required: true, index: true },
   themeRef: { type: ObjectId, ref: 'Theme', required: true, index: true },
   itemsCount: { type: Number, required: true, default: 0, index: true },
   timestamp: { type: Number, required: true, default: Date.now },
   userRef: { type: ObjectId, ref: 'User', required: true, index: true }
});

module.exports = model('Collection', Collection);