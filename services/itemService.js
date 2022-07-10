const Item = require('../models/Item');
const Like = require('../models/Like');
const collectionService = require('../services/collectionService');
const tagService = require('../services/tagService');

class ItemService {
   create = async (item, userId) => {
      const newItem = await new Item({
         ...item,
         userRef: userId
      }).save();

      tagService.update(item.tags);

      const count = await Item.count({ collectionRef: item.collectionRef });
      await collectionService.updateItemsCount(item.collectionRef, count);


      return newItem;
   };

   getOne = async (id, userId) => {
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