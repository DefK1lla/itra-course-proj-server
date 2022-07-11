const Item = require('../models/Item');
const Like = require('../models/Like');
const Collection = require('../models/Collection');
const tagService = require('../services/tagService');

class ItemService {
   create = async (item) => {
      const newItem = await new Item({
         ...item
      }).save();

      tagService.update(item.tags);
      
      const count = await Item.count({ collectionRef: item.collectionRef });
      await Collection.findByIdAndUpdate(item.collectionRef, { itemsCount: count });

      return newItem;
   };

   getOneById = async (id, userId) => {
      const item = await Item.findById(id)
         .populate({ 
            path: 'userRef', 
            select: 'username'
         })
         .populate({ 
            path: 'collectionRef', 
            select: 'title'
         })
         .populate('fields.fieldRef')
         .lean();
      this.isItemFound(item);

      if (userId) {
         const like = await Like.findOne({ userRef: userId, itemRef: id });
         item.isLiked = Boolean(like);
      }

      return item;
   };

   getForEdit = async (id) => {
      const item = await Item.findById(id)
         .populate('fields.fieldRef')
         .lean();
      this.isItemFound(item);     

      return item;
   };

   updateOneById = async (id, item) => {
      const updatedItem = await Item.findByIdAndUpdate(id, item).lean();
      this.isItemFound(item);
      tagService.update(item.tags);

      return updatedItem;
   };

   deleteOneById = async (id) => {
      const deletedItem = await Item.findByIdAndDelete(id).lean();
      this.isItemFound(deletedItem);

      return { ...deletedItem};
   };

   deleteManyById = async (ids) => {
      const items = await Promise.all(ids.map(id => Item.findByIdAndDelete(id)));
      const count = await Item.count({ collectionRef: items[0].collectionRef });
      await Collection.findByIdAndUpdate(items[0].collectionRef, { itemsCount: count });

      return items;
   }
   
   getCollectionItems = async (collectionId, orderBy, order, page, rowsPerPage) => {
      const count = await Item.count({ collectionRef: collectionId });
      const items = await Item.find({ collectionRef: collectionId })
         .populate('fields.fieldRef')
         .limit(rowsPerPage).sort({ [orderBy]: order }).skip(page * rowsPerPage)
         .lean();
      return { items, count };
   };

   like = async (id, userId) => {
      const like = await new Like({ userRef: userId, itemRef: id }).save();
      Item.findByIdAndUpdate(id, {
         $inc: { likesCount: 1 }
      }).exec();

      return like;
   };

   dislike = async (id, userId) => {
      const like = await Like.findOneAndDelete({ userRef: userId, itemRef: id }).lean();
      Item.findByIdAndUpdate(id, {
         $inc: { likesCount: -1 }
      }).exec();

      return like;
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