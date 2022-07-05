const themeService = require('../services/themeService');
const errorHandler = require('../utils/errorHandler');

class ThemeController {
   getAll = async (req, res) => {
      try {
         const themes = await themeService.getAll();

         return res.json(themes);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new ThemeController();