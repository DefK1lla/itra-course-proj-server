const Collection = require('../models/Collection');
const Field = require('../models/Field');

class CollectionService {
   create = async (collection, userId, fields) => {
      const newCollection = await new Collection({ 
         ...collection, 
         userRef: userId 
      }).save();

      Promise.all(fields.map(field => (
         new Field({ 
            ...field,
            collectionRef: newCollection._id
         }).save()
      )));

      return newCollection;
   };

   updateOneById = async (id, collection, fields) => {
      const updatedCollection = await Collection.findByIdAndUpdate(id, collection).lean();
      this.isCollectionFound(updatedCollection);
      Promise.all(fields.map(field => {
         if(field._id) return Field.findByIdAndUpdate(field._id, field);
         return new Field({ 
            ...field, 
            collectionRef: updatedCollection._id 
         }).save();
      }));

      return { ...updatedCollection, fields };
   };

   deleteOneById = async (id) => {
      const deletedCollection = await Collection.findByIdAndDelete(id).lean();
      this.isCollectionFound(deletedCollection);
      const fields = await Field.find({ collectionRef: deletedCollection._id }).lean();
      await Field.deleteMany({ collectionRef: deletedCollection._id });

      // ToDo delete items

      return { ...deletedCollection, fields};
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