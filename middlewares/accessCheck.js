const collectionService = require('../services/collectionService');

module.exports = async function (req, res, next) {
   if (req.method === 'OPTIONS') {
      return next();
   }

   try {
      if(req.user.role === 'ADMIN') return next();

      const collection = await collectionService.getOneById(req.params.id);
      console.log(collection.userRef, req.user._id)

      if(String(collection.userRef) == String(req.user._id)) return next();

      return res.status(403).json({ message: 'Forbidden' });

   } catch (e) {
      console.log(e)
      res.status(403).json({ message: 'Forbidden' });
   }
}