const collectionService = require('../services/collectionService');
const errorHandler = require('../utils/errorHandler');

class CollectionController {
   create = async (req, res) => {
      try {
         const { collection, fields } = req.body;
         const userId = req.user._id;
         const data = await collectionService.create(collection, userId, fields);

         return res.json(data);
      } catch(e) { 
         console.log(e);
         errorHandler(res, e);
      }
   };

   updateOne = async (req, res) => {
      try {
         const { id, collection, fields } = req.body;
         const data = await collectionService.updateOneById(id, collection, fields);

         return res.json(data);
      } catch(e) { 
         console.log(e);
         errorHandler(res, e);
      }
   };

   deleteOne = async (req, res) => {
      try {
         const { id } = req.params;
         const isSuccess = await collectionService.deleteOneById(id);

         return res.json({
            success: isSuccess
         });
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new CollectionController();