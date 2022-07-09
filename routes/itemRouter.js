const Router = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const accessCheck = require('../middlewares/accessCheck');
const itemController = require('../controllers/itemController');

const itemRouter = new Router();

itemRouter.post('/', authMiddleware, itemController.create);
itemRouter.get('/:id', itemController.getOne);
itemRouter.get('/:id/edit', authMiddleware, itemController.getForEdit);
itemRouter.put('/:id', itemController.updateOne);

module.exports = itemRouter;