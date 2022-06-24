const bcrypt = require('bcryptjs');

const User = require('../models/User');

class UserService {
    create = async (userData) => {
        const { username, email, password } = userData;
        const error = await this.checkUserExistence(username, email);

        if (error) {
            throw {
                status: 400,
                error
            }
        }

        userData.password = await bcrypt.hash(password, 7);
        const newUser = await new User(userData).save();

        return {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };
    }

    login = async (username, password) => {
        const user = await User.findOne({ username }, {
            _id: 1,
            username: 1,
            email: 1,
            role: 1,
            password: 1,
            status: 1
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

    checkUserExistence = async (username, email) => {
        const checkByUsername = await User.findOne({ username }).lean();

        if (checkByUsername) {
            return {
                field: 'username',
                message: 'Username is busy!'
            };
        }

        const checkByEmail = await User.findOne({ email }).lean();

        if (checkByEmail) {
            return {
                field: 'email',
                message: 'Email is busy!'
            };
        };
    }
}

module.exports = new UserService;