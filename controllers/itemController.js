const itemService = require('../services/itemService');

class ItemController {
   create = async (req, res) => {
      const item = req.body;
      const userId = req.user._id;
      const newItem = await itemService.create(item, userId);

      return res.json(newItem);
   };
}

module.exports = new ItemController();