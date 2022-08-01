const Comment = require('../models/Comment');

class CommentService {
   create = async (text, itemId, userId) => {
      const newComment = await new Comment({
         text,
         userRef: userId,
         itemRef: itemId
      }).save();
      const count = await Comment.count({ itemRef: itemId });

      newComment.populate('userRef itemRef');

      return { comment: newComment, count };
   };

   getItemComments = async (itemId, commentsPerPage, page) => {
      const count = await Comment.count({ itemRef: itemId });
      const comments = await Comment.find({ itemRef: itemId })
         .populate({ path: 'userRef', select: 'username' })
         .limit(commentsPerPage)
         .sort({ 'timestamp': -1 }).skip(page * commentsPerPage)
         .lean();

     return { comments, count };
   };
}

module.exports = new CommentService();