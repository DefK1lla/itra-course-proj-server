const searchService = require('../services/searchService');
const errorHandler = require('../utils/errorHandler');


class SearchController {
   fullTextSearch = async (req, res) => {
      try {
         const { keyword, limit, page  } = req.query;
         const result = await searchService.fullTextSearch(keyword, page, limit);

         return res.json(result);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };

   userSearch = async (req, res) => {
      try {
         const { keyword, orderBy, order, page, rowsPerPage } = req.query;
         const data = await searchService.userSearch(keyword, orderBy, order, page, rowsPerPage);

         return res.json(data);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new SearchController();