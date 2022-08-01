const commentService = require('../services/commentService');
const errorHandler = require('../utils/errorHandler');

class CommentController {
   create = async (req, res) => {
      try {
         const { itemId } = req.params;
         const { text } = req.body;
         const userId = req.user._id;
         const data = await commentService.create(text, itemId, userId);

         return res.json(data);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getItemComments = async (req, res) =>{
      try {
         const { itemId } = req.params;
         const { commentsPerPage, page } = req.query;
         const data = await commentService.getItemComments(itemId, commentsPerPage, page);

         return res.json(data);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new CommentController();