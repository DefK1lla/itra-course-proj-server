const jwt = require('jsonwebtoken');

const userService = require('../services/userService');
const { SECRET_KEY } = require('../utils/config');

module.exports = async function (req, res, next) {
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await userService.getOneById(decoded._id);

      if (user === null || user.status === 'blocked') {
         return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;
      next();
   } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'Unauthorized' });
   }
}