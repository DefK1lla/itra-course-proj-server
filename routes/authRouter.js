const Router = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationErrors = require('../middlewares/validationErrors');
const registerValidation = require('../utils/validations');

const authRouter = new Router();

authRouter.post('/registration', registerValidation, validationErrors, userController.registration);
authRouter.post('/login', userController.login);
authRouter.get('/authentication', authMiddleware, userController.authentication);

module.exports = authRouter;