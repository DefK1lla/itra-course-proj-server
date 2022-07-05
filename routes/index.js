const Router = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const collectionRouter = require('./collectionRouter');
const fileRouter = require('./fileRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/collection', collectionRouter);
router.use('/file', fileRouter);

module.exports = router;