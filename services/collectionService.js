const Collection = require('../models/Collection');
const Field = require('../models/Field');

class CollectionService {
   create = async (collection, userId, fields) => {
      const newCollection = await new Collection({ 
         ...collection, 
         userRef: userId 
      }).save();

      await Promise.all(fields.map(field => (
         new Field({ 
            ...field,
            collectionRef: newCollection._id
         }).save()
      )));

      return newCollection;
   };

   updateOneById = async (id, collection, fields) => {

   };

   deleteOneById = async (id) => {
      const deletedCollection = await Collection.findByIdAndDelete(id).lean();

      this.isCollectionFound(deletedCollection);

      const fields  = Field.deleteMany({ collectionRef: deletedCollection._id }).exec();

      // ToDo delete items

      return Boolean(deletedCollection);
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