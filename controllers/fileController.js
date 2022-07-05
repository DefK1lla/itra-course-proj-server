const fileService = require('../services/fileService');
const errorHandler = require('../utils/errorHandler');

class FileController {
   upload = async (req, res) => {
      try {
         const { file } = req.files;
         const src = await fileService.upload(file);

         return res.json(src);
      } catch (e) {
         console.log(e);
         errorHandler(res, e);
      }
   };
}

module.exports = new FileController();