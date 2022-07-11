const Router = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const themeRouter = require('./themeRouter');
const collectionRouter = require('./collectionRouter');
const itemRouter = require('./itemRouter');
const fileRouter = require('./fileRouter');
const tagRouter = require('./tagRouter');
const commentRouter = require('./commentRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/theme', themeRouter);
router.use('/collection', collectionRouter);
router.use('/item', itemRouter);
router.use('/file', fileRouter);
router.use('/tag', tagRouter);
router.use('/comment', commentRouter);

module.exports = router;