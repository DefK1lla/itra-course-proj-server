const Router = require('express');

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const adminRouter = new Router();

adminRouter.get('/users', authMiddleware, checkRole('ADMIN'), adminController.getUsers);
adminRouter.put('/block', authMiddleware, checkRole('ADMIN'), adminController.block);
adminRouter.put('/unblock', authMiddleware, checkRole('ADMIN'), adminController.unBlock);
adminRouter.delete('/', authMiddleware, checkRole('ADMIN'), adminController.delete);

module.exports = adminRouter;