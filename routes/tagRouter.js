const Router = require('express');

const tagController = require('../controllers/tagController');

const tagRouter = new Router();

tagRouter.get('/', tagController.getAll);
tagRouter.get('/:keyword', tagController.autocomplete);

module.exports = tagRouter;