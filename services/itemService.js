const Item = require('../models/Item');

class ItemService {
   create = async (item, userId) => {
      const newItem = await new Item({
         ...item,
         userRef: userId
      }).save();

      return newItem;
   };

   getOne = async (id) => {
      const item = await Item.findById(item)
         .populate({ 
            path: 'userRef', 
            select: 'username'
         }, { 
            path: 'collectionRef', 
            select: 'title'
         })
         .lean();
      
      this.isItemFound(item);

      return item;
   };

   isItemFound = (item) => {
      if(!item) {
         throw {
            status: 404,
            error: {
               message: 'Not found'
            }
         }
      }
   };
}

module.exports = new ItemService();