const Router = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const userRouter = new Router();

userRouter.get('/', authMiddleware, checkRole('ADMIN'), userController.get);
userRouter.put('/block', authMiddleware, checkRole('ADMIN'), userController.block);
userRouter.put('/unblock', authMiddleware, checkRole('ADMIN'), userController.unBlock);
userRouter.delete('/', authMiddleware, checkRole('ADMIN'), userController.delete);

module.exports = userRouter;