const Theme = require('../models/Theme');

class ThemeService {
   getAll = async () => {
      const themes = await Theme.find({});
      this.isThemeFound(themes);

      return themes;
   };

   isThemeFound = (theme) => {
      if (!theme) {
         throw {
            status: 404,
            error: {
               message: 'Not Found'
            }
         }
      }
   };
}

module.exports = new ThemeService();