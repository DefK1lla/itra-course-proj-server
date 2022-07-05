const Router = require('express');

const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middlewares/authMiddleware');
const authCheck = require('../middlewares/accessCheck');

const collectionRouter = new Router();

collectionRouter.post('/', authMiddleware, collectionController.create);
collectionRouter.put('/:id', authMiddleware, authCheck, collectionController.updateOne);
collectionRouter.delete('/:id', authMiddleware, authCheck, collectionController.deleteOne);

module.exports = collectionRouter;