const Router = require('express');

const themeController = require('../controllers/themeController');

const themeRouter = new Router();

themeRouter.get('/', themeController.getAll);

module.exports = themeRouter;