const Router = require('express');

const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middlewares/authMiddleware');
const CollectionAccessCheck = require('../middlewares/CollectionAccessCheck');

const collectionRouter = new Router();


collectionRouter.get('/:id', collectionController.getOne);
collectionRouter.get('/user/:userId', collectionController.getUserCollections);
collectionRouter.post('/', authMiddleware, CollectionAccessCheck, collectionController.create);
collectionRouter.get('/fields/:id', authMiddleware, CollectionAccessCheck, collectionController.getFields);
collectionRouter.put('/:id', authMiddleware, CollectionAccessCheck, collectionController.updateOne);
collectionRouter.get('/:id/edit', authMiddleware, CollectionAccessCheck, collectionController.getOneWithFields);
collectionRouter.delete('/:id', authMiddleware, CollectionAccessCheck, collectionController.deleteOne);

module.exports = collectionRouter;