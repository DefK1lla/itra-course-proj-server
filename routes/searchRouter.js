const Router = require('express');

const searchController = require('../controllers/searchController');

const searchRouter = new Router();

searchRouter.get('/fullText', searchController.fullTextSearch);
searchRouter.get('/user', searchController.userSearch);

module.exports = searchRouter;