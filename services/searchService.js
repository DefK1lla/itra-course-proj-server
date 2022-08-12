const Collection = require('../models/Collection');
const Item = require('../models/Item');
const User = require('../models/User');

class SearchService {
   fullTextSearch = async (keyword, page, limit) => {
      const collections = await Collection.aggregate([
         { 
            $search: {
               index: 'fullText',
               compound: {
                  must: [
                     {
                        text: {
                           query: keyword,
                           path: {
                              'wildcard': '*'
                           },
                           fuzzy: {
                              maxEdits: 1,
                           },
                        },
                     },
                  ],
               },
            }
         },
         {
            $lookup: {
               from: 'users',
               localField: 'userRef',
               foreignField: '_id',
               as: 'userRef'
            }
         },
         {
            $unwind: '$userRef'
         },
         {
            $project: {
               _id: 1,
               title: 1,
               description: 1,
               userRef: 1,
               theme: 1,
               imgSrc: 1,
               timestamp: 1,
               itemsCount: 1,
               score: {
                  $meta: 'searchScore'
               }
            }
         }
      ]);

      this.isFound(collections);

      const items = await Item.aggregate([
         { 
            $search: {
              index: 'fullText',
              compound: {
                  must: [
                     {
                        text: {
                           query: keyword,
                           path: {
                              'wildcard': '*'
                           },
                           fuzzy: {
                              maxEdits: 1,
                           },
                        },
                     },
                  ],
               },
            },
         },
         {
            $lookup: {
               from: 'users',
               localField: 'userRef',
               foreignField: '_id',
               as: 'userRef'
            }
         },
         {
            $unwind: '$userRef'
         },
         {
            $lookup: {
               from: 'collections',
               localField: 'collectionRef',
               foreignField: '_id',
               as: 'collectionRef'
            }
         },
         {
            $unwind: '$collectionRef'
         },
         {
            $project: {
               title: 1,
               collectionRef: 1,
               userRef: 1,
               likesCount: 1,
               timestamp: 1,
               tags: 1,
               score: {
                  $meta: 'searchScore'
               }
            }
         }
      ]);

      this.isFound(items);

      const start = limit * (page - 1);
      const end = start + limit;
      const result = items.concat(collections).sort((a, b) => b.score - a.score);

      return {
         result: result.slice(start, end),
         count: result.length
      };
   };

   userSearch = async (keyword, orderBy, order, page, rowsPerPage) => {
      const searchRegExp = new RegExp(keyword);
      const count = await User.count({
         username: {
            $regex: searchRegExp
         } 
      });
      const users = await User.find({
         username: {
            $regex: searchRegExp
         } 
      })
      .select({ _id: 1, username: 1, email: 1, role: 1, status: 1, timestamp: 1 })
      .limit(rowsPerPage).sort({ [orderBy]: order }).skip(page * rowsPerPage)
      .lean();

      this.isFound(users);

      return { users, count };
   };

   isFound = (res) => {
      if (!res) {
         throw {
            status: 404,
            error: {
               message: 'Not found'
            }
         }
      }
   };
}

module.exports = new SearchService();