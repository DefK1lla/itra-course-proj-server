const Router = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const accessCheck = require('../middlewares/accessCheck');
const itemController = require('../controllers/itemController');

const itemRouter = new Router();

itemRouter.post('/', authMiddleware, itemController.create);

module.exports = itemRouter;