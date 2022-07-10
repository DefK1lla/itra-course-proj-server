const collectionService = require('../services/collectionService');

module.exports = async function (req, res, next) {
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      if (req.user.role === 'ADMIN') return next();

      if (req.method === 'POST') {
         if (String(req.body.collection.userRef) === String(req.user._id)) return next();
         return res.status(403).json({ message: 'Forbidden' });
      }

      const collection = await collectionService.getOneById(req.params.id);
      if(String(collection.userRef._id) == String(req.user._id)) return next();

      return res.status(403).json({ message: 'Forbidden' });
   } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Server error' });
   }
};