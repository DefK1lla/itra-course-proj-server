const searchService = require('../services/searchService');

class SearchController {
   fullTextSearch = async (req, res) => {
      const { keyword, limit, page  } = req.query;
      const result = await searchService.fullTextSearch(keyword, page, limit);

      res.json(result);
   };
}

module.exports = new SearchController();