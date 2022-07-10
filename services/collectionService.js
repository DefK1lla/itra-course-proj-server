const Collection = require('../models/Collection');
const Field = require('../models/Field');
const Item = require('../models/Item');
const itemService = require('../services/itemService');

class CollectionService {
   create = async (collection, fields) => {
      const newCollection = await new Collection({ 
         ...collection, 
      }).save();

      let newFields = [];

      if (fields) {
         newFields = await Promise.all(fields.map(field => (
               new Field({ 
                  ...field,
                  collectionRef: newCollection._id
               }).save()
         )));
      }

      return { ...newCollection._doc, fields: newFields };
   };

   getOneById = async (id) => {
      const collection = await Collection.findById(id)
         .populate({ path: 'userRef', select: 'username'})
         .lean();
      this.isCollectionFound(collection);

      return collection; 
   };

   updateOneById = async (id, collection, fields) => {
      const updatedCollection = await Collection.findByIdAndUpdate(id, collection).lean();
      this.isCollectionFound(updatedCollection);

      if (fields) {
         let newFields = fields.filter(field => !field._id);
         let fieldsToUpdate = fields.filter(field => field._id);

         const oldFields = await Field.find({ collectionRef: updatedCollection._id });
         const updatedFields = await Promise.all(oldFields.map(oldField => {
            const fieldToUpdate = fieldsToUpdate.find(fieldToUpdate => 
               String(fieldToUpdate._id) === String(oldField._id)
            );
             
            if (fieldToUpdate) return oldField.updateOne(fieldToUpdate);

            const items = Item.updateMany({ collectionRef: updatedCollection._id }, {
               '$pull': { fields: { fieldRef: oldField._id } }
            }).exec();

            return oldField.remove();
         }));

         newFields = await Promise.all(newFields.map(newField => {
            return new Field({ 
               ...newField, 
               collectionRef: updatedCollection._id 
            }).save();
         }));
      }

      return { ...updatedCollection };
   };

   deleteOneById = async (id) => {
      const deletedCollection = await Collection.findByIdAndDelete(id).lean();
      this.isCollectionFound(deletedCollection);
      const fields = await Field.find({ collectionRef: deletedCollection._id }).lean();
      Field.deleteMany({ collectionRef: deletedCollection._id }).exec();
      Item.deleteMany({ collectionRef: deletedCollection._id }).exec();

      return { ...deletedCollection, fields};
   };

   getOneWithFields = async (id) => {
      const collection = await Collection.findById(id).lean();
      this.isCollectionFound(collection)
      const fields = await Field.find({ collectionRef: id }).lean();

      return { ...collection, fields };
   };

   getFields = async (id) => {
      const fields = await Field.find({ collectionRef: id });

      return fields;
   };

   getUserCollections = async (userId) => {
      const collections = await Collection.find({ userRef: userId })
         .select({ title: 1, imgSrc: 1, theme: 1, itemsCount: 1, userRef: 1, timestamp: 1 })
         .populate({ path: 'userRef', select: 'username'})
         .lean();
      this.isCollectionFound(collections);

      return collections;
   };

   isCollectionFound = (collection) => {
      if(!collection) {
         throw {
            status: 404,
            error: {
               message: 'Not found'
            }
         }
      }
   };
}

module.exports = new CollectionService();