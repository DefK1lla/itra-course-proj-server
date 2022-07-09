const Tag = require('../models/Tag');

class TagService {
   update = async (tagNames) => {
      Promise.all(tagNames.map(tagName => {
         Tag.findOne({ title: tagName }).exec((err, res) => {
            if (err) throw err;
            if (!res) new Tag({ title: tagName }).save();
         });
      }));
   };

   getAll = async () => {
      const tags = await Tag.find();

      return tags;
   };

   autocomplete = async (keyword) => {
      const tags = await Tag.aggregate([
         {
           $search: {
               index: "autocomplete",
               autocomplete: {
                  query: keyword,
                  path: "title",
                  fuzzy: {
                  maxEdits: 1,
                  },
                  tokenOrder: "sequential",
               },
            },
         },
         {
           $project: {
               title: 1,
               _id: 1,
           },
         },
         {
           $limit: 10,
         },
      ]);

      return tags;
   };

   isTagFound = (tag) => {
      if (!tag) {
         throw {
            status: 404,
            error: {
               message: 'Not found'
            }
         }
      }
   };
}

module.exports = new TagService();