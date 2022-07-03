const bcrypt = require('bcryptjs');

const User = require('../models/User');

class UserService {
   create = async (username, email, password) => {
      username = username.toLowerCase();
      email = email.toLowerCase();
      await this.checkUserExistence(username, email);
      password = await bcrypt.hash(password, 7);
      const newUser = await new User({ username, email, password }).save();

      return {
         _id: newUser._id,
         username: newUser.username,
         email: newUser.email,
         role: newUser.role,
         timestamp: newUser.timestamp
      };
   }

   login = async (username, password) => {
      username = username.toLowerCase();
      const user = await User.findOne({ username }, {
         _id: 1,
         username: 1,
         email: 1,
         role: 1,
         password: 1,
         status: 1,
         timestamp: 1
      }).lean();

      const comparePassword = user ? bcrypt.compareSync(password, user.password) : false;

      if (!user || !comparePassword) {
         throw {
            status: 404,
            error: {
               message: 'Not Found. Incorrect username or password'
            }
         }
      } else if (user.status === 'blocked') {
         throw {
            status: 403,
            error: {
               message: 'Forbidden. The user is blocked'
            }
         };
      }

      delete user.password;
      return user;
   }

   getAll = async (orderBy, order, page, rowsPerPage) => {
      const countQuery = User.count({});
      const usersQuery = User.find({}, {
         _id: 1,
         username: 1,
         email: 1,
         role: 1,
         status: 1,
         timestamp: 1
      }).sort({ [orderBy]: order }).limit(rowsPerPage).skip(page * rowsPerPage).lean();

      const [count, users] = await Promise.all([countQuery, usersQuery]);

      return {
         count,
         users
      };
   };

   getOneById = async (id) => {
      const user = await User.findById(id, {
         _id: 1,
         username: 1,
         email: 1,
         role: 1,
         status: 1,
         timestamp: 1
      }).lean();

      return user;
   }

   blockUsersById = async (ids) => {
      const users = await Promise.all(ids.map(id => {
         return User.findByIdAndUpdate(id, { status: 'blocked' }, { new: true }).lean();
      }));

      return {
         success: users ? true : false
      };
   };

   unBlockUsersById = async (ids) => {
      const users = await Promise.all(ids.map(id => {
         return User.findByIdAndUpdate(id, { status: 'active' }, { new: true }).lean();
      }));

      return {
         success: users ? true : false
      };
   };

   deleteUsersById = async (ids) => {
      const users = await Promise.all(ids.map(id => {
         return User.findByIdAndDelete(id).lean();
      }));

      return {
         success: users ? true : false
      };
   };

   addAdmins = async (ids) => {
      const users = await Promise.all(ids.map(id => {
         return User.findByIdAndUpdate(id, { role: 'ADMIN' }, { new: true }).lean();
      }));

      return {
         success: users ? true : false
      };
   };

   deleteAdmins = async (ids) => {
      const users = await Promise.all(ids.map(id => {
         return User.findByIdAndUpdate(id, { role: 'USER' }, { new: true }).lean();
      }));

      return {
         success: users ? true : false
      };
   };

   checkUserExistence = async (username, email) => {
      const checkByUsername = await User.findOne({ username }).lean();

      if (checkByUsername) {
         throw {
            status: 400,
            error: {
               field: 'username',
               message: 'Username is busy!'
            }
         };
      }

      const checkByEmail = await User.findOne({ email }).lean();

      if (checkByEmail) {
         throw {
            status: 400,
            error: {
               field: 'email',
               message: 'Email is busy!'
            }
         };
      };
   }

   isUserFound = (user) => {
      if (!user) {
         throw {
            status: 404,
            error: {
               message: 'Not Found.'
            }
         };
      }
   };
}

module.exports = new UserService;
