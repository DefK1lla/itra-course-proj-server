const Router = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');

const fileRouter = new Router();

fileRouter.post('/', authMiddleware, fileController.upload);

module.exports = fileRouter;