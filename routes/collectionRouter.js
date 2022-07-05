const Router = require('express');

const collectionController = require('../controllers/collectionController');
const authMiddleware = require('../middlewares/authMiddleware');

const collectionRouter = new Router();

collectionRouter.post('/', authMiddleware, collectionController.create);
collectionRouter.delete('/:id', authMiddleware, collectionController.deleteOne);

module.exports = collectionRouter;