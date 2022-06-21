const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { SECRET_KEY } = require('../config/config');

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Not authorized' });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(decoded.id).lean();

        if (user === null || user.status === 'blocked') {
            res.status(401).json({ message: 'Not authorized' });
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Not authorized' });
    }
}