const Router = require('express');

const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middlewares/authMiddleware');
const accessCheck = require('../middlewares/accessCheck');

const collectionRouter = new Router();

collectionRouter.post('/', authMiddleware, collectionController.create);
collectionRouter.put('/:id', authMiddleware, accessCheck, collectionController.updateOne);
collectionRouter.get('/:id/edit', authMiddleware, accessCheck, collectionController.getOneWithFields);
collectionRouter.delete('/:id', authMiddleware, accessCheck, collectionController.deleteOne);

module.exports = collectionRouter;