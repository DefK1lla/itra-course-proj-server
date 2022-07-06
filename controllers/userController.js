const userService = require('../services/userService');
const collectionService = require('../services/collectionService');
const errorHandler = require('../utils/errorHandler');

class UserController {
   getAll = async (req, res) => {
      try {
         const { orderBy, order, page, rowsPerPage } = req.query;
         const data = await userService.getAll(orderBy, order, page, rowsPerPage);

         return res.json(data);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getOne = async (req, res) => {
      try {
         const { userId } = req.params;
         const [user, collections] = 
            await Promise.all([userService.getOneById(userId), collectionService.getUserCollections(userId)]);
         
         return res.json({ user, collections });
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   block = async (req, res) => {
      try {
         const { userIds } = req.body;
         const users = await userService.blockById(userIds);

         res.json(users);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   unBlock = async (req, res) => {
      try {
         const { userIds } = req.body;
         const users = await userService.unBlockById(userIds);

         res.json(users);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
     }
   };

   delete = async (req, res) => {
      try {
         const { userIds } = req.query;
         const users = await userService.deleteById(userIds);

         res.json(users);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   addAdmins = async (req, res) => {
      try {
         const { userIds } = req.body;
         const users = await userService.addAdmins(userIds);

         res.json(users);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   deleteAdmins = async (req, res) => {
      try {
         const { userIds } = req.query;
         const users = await userService.deleteAdmins(userIds);

         res.json(users);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new UserController();