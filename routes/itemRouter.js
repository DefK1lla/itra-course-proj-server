const Router = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const itemAccessCheck = require('../middlewares/itemAccessCheck');
const itemController = require('../controllers/itemController');

const itemRouter = new Router();

itemRouter.post('/', authMiddleware, itemAccessCheck, itemController.create);
itemRouter.get('/latest', itemController.getLatest);
itemRouter.get('/:id', itemController.getOne);
itemRouter.get('/:id/edit', authMiddleware, itemAccessCheck, itemController.getForEdit);
itemRouter.get('/:collectionId/collection', itemController.getCollectionItems);
itemRouter.put('/:id', authMiddleware, itemAccessCheck, itemController.updateOne);
itemRouter.delete('/many', authMiddleware, itemController.deleteMany);
itemRouter.delete('/one/:id', authMiddleware, itemAccessCheck, itemController.deleteOne);
itemRouter.post('/:id/like', authMiddleware, itemController.like);
itemRouter.delete('/:id/like', authMiddleware, itemController.dislike);


module.exports = itemRouter;