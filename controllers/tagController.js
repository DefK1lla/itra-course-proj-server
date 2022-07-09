const tagService = require('../services/tagService');
const errorHandler = require('../utils/errorHandler');

class TagController {
   autocomplete = async (req, res) => {
      try {
         const { keyword } = req.params;
         const tags = await tagService.autocomplete(keyword);

         res.json(tags);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   getAll = async (req, res) => {
      try {
         const tags = await tagService.getAll();

         res.json(tags);
      } catch(e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new TagController();