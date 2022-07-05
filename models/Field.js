const { Schema, model, ObjectId } = require('mongoose');

const Field = new Schema({
   title: { type: String, required: true },
   type: { type: String, required: true },
   collectionRef: { type: ObjectId, ref: 'Collection', required: true, index: true }
});

module.exports = model('Field', Field);