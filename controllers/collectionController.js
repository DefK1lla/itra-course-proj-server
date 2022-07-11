const collectionService = require('../services/collectionService');
const errorHandler = require('../utils/errorHandler');

class CollectionController {
   create = async (req, res) => {
      try {
         const { collection, fields } = req.body;
         const newCollection = await collectionService.create(collection, fields);

         return res.json(newCollection);
      } catch(e) { 
         console.log(e);
         errorHandler(res, e);
      }
   };

   getOne = async (req, res) => {
      try {
         const { id } = req.params;
         const collection = await collectionService.getOneById(id);

         return res.json(collection);
      } catch(e) { 
         console.log(e);
         errorHandler(res, e);
      }
   };

   getLargest = async (req, res) => {
      try {
         const collections = await collectionService.getLargest();

         return res.json(collections);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   updateOne = async (req, res) => {
      try {
         const { id } = req.params;
         const { collection, fields } = req.body;
         const updeatedCollection = await collectionService.updateOneById(id, collection, fields);

         return res.json(updeatedCollection);
      } catch(e) { 
         console.log(e);
         errorHandler(res, e);
      }
   };

   deleteOne = async (req, res) => {
      try {
         const { id } = req.params;
         const deletedCollection = await collectionService.deleteOneById(id);

         return res.json(deletedCollection);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getOneWithFields = async (req, res) => {
      try {
         const { id } = req.params;
         const collectionWithFields = await collectionService.getOneWithFields(id);

         return res.json(collectionWithFields);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getFields = async (req, res) => {
      try {
         const { id } = req.params;
         const fields = await collectionService.getFields(id);

         res.json(fields);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getUserCollections = async (req, res) => {
      try {
         const { userId } = req.params;
         const collection = await collectionService.getUserCollections(userId);

         return res.json(collection);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new CollectionController();