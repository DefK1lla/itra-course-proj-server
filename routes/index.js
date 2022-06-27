const Router = require('express');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');


const router = new Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);

module.exports = router;