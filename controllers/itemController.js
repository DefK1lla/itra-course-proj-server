const itemService = require('../services/itemService');
const errorHandler = require('../utils/errorHandler');

class ItemController {
   create = async (req, res) => {
      try {
         const item = req.body;
         const userId = req.user._id;
         const newItem = await itemService.create(item, userId);

         return res.json(newItem);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getOne = async (req, res) => {
      try {
         const { id } = req.params;
         const { userId } = req.query;
         const item = await itemService.getOne(id, userId);

         return res.json(item);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getForEdit = async (req, res) => {
      try {
         const { id } = req.params;
         const item = await itemService.getForEdit(id);

         return res.json(item);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   updateOne = async (req, res) => {
      try {
         const { id } = req.params;
         const item = req.body;
         const updatedItem = await itemService.updateOneById(id, item);

         return res.json(updatedItem);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   like = async (req, res) => {
      try {
         const { id } = req.params;
         const userId = req.user._id;
         const like = await itemService.like(id, userId);

         return res.json(like);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   dislike = async (req, res) => {
      try {
         const { id } = req.params;
         const userId = req.user._id;
         const like = await itemService.dislike(id, userId);

         return res.json(like);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new ItemController();