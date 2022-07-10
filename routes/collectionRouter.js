const Router = require('express');

const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middlewares/authMiddleware');
const collectionAccessCheck = require('../middlewares/collectionAccessCheck');

const collectionRouter = new Router();


collectionRouter.get('/:id', collectionController.getOne);
collectionRouter.get('/user/:userId', collectionController.getUserCollections);
collectionRouter.post('/', authMiddleware, collectionAccessCheck, collectionController.create);
collectionRouter.get('/fields/:id', authMiddleware, collectionAccessCheck, collectionController.getFields);
collectionRouter.put('/:id', authMiddleware, collectionAccessCheck, collectionController.updateOne);
collectionRouter.get('/:id/edit', authMiddleware, collectionAccessCheck, collectionController.getOneWithFields);
collectionRouter.delete('/:id', authMiddleware, collectionAccessCheck, collectionController.deleteOne);

module.exports = collectionRouter;