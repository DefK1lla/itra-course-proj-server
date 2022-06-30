const Router = require('express');

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationErrors = require('../middlewares/validationErrors');
const { registerValidation } = require('../utils/validations');

const authRouter = new Router();

authRouter.post('/registration', registerValidation, validationErrors, authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/check', authMiddleware, authController.check);

module.exports = authRouter;