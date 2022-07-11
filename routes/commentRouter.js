const Router = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');

const commentRouter = new Router();

commentRouter.post('/:itemId', authMiddleware, commentController.create);
commentRouter.get('/:itemId', commentController.getItemComments);

module.exports = commentRouter;