const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Not authorized' });
        }

        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Not authorized' });
    }
}