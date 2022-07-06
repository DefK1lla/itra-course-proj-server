const Router = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const userRouter = new Router();

userRouter.get('/', authMiddleware, checkRole('ADMIN'), userController.getAll);
userRouter.get('/:userId', userController.getOne);
userRouter.put('/block', authMiddleware, checkRole('ADMIN'), userController.block);
userRouter.put('/unblock', authMiddleware, checkRole('ADMIN'), userController.unBlock);
userRouter.post('/admin', authMiddleware, checkRole('ADMIN'), userController.addAdmins);
userRouter.delete('/admin', authMiddleware, checkRole('ADMIN'), userController.deleteAdmins);
userRouter.delete('/', authMiddleware, checkRole('ADMIN'), userController.delete);

module.exports = userRouter;