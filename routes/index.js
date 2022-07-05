const Router = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const collectionRouter = require('./collectionRouter');
const fileRouter = require('./fileRouter');
const themeRouter = require('./themeRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/collection', collectionRouter);
router.use('/file', fileRouter);
router.use('/theme', themeRouter);

module.exports = router;