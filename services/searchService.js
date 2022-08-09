const Collection = require('../models/Collection');
const Item = require('../models/Item');

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

      const start = limit * (page - 1);
      const end = start + limit;
      const result = items.concat(collections).sort((a, b) => b.score - a.score).slice(start, end);

      return {
         result,
         count: result.length
      };
   };
}

module.exports = new SearchService();