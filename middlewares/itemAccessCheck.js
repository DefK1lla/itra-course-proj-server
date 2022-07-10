const itemService = require('../services/itemService');

module.exports = async function (req, res, next) {
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      if (req.user.role === 'ADMIN') return next();

      if (req.method === 'POST') {
         if (String(req.body.userRef) === String(req.user._id)) return next();
         return res.status(403).json({ message: 'Forbidden' });
      }

      const item = await itemService.getOneById(req.params.id);
      if(String(item.userRef._id) == String(req.user._id)) return next();

      return res.status(403).json({ message: 'Forbidden' });
   } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' });
   }
};