const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/User');
const { SECRET_KEY } = require('../utils/config');

const generateToken = ({ _id, email, role }) => {
    return jwt.sign({
        _id,
        email,
        role
    }, SECRET_KEY, {
        expiresIn: '24h'
    });
}

const checkUserExistence = async (username, email) => {
    const checkByUsername = await User.findOne({ username }).lean();

    if (checkByUsername) {
        return {
            field: 'username'
        };
    }

    const checkByEmail = await User.findOne({ email }).lean();

    if (checkByEmail) {
        return {
            field: 'email'
        };
    };
}

class UserController {
    registration = async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const error = await checkUserExistence(username, email);
            if (error) {
                return res.status(400).json({ error });
            }

            const hashPassword = await bcrypt.hash(password, 7);
            const userData = {
                username,
                email,
                password: hashPassword
            };

            const user = await new User(userData).save();

            const token = generateToken({ ...user });

            return res.json({
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Server Error" });
        }
    };

    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username }, {
                _id: 1,
                username: 1,
                email: 1,
                role: 1,
                password: 1,
                status: 1
            }).lean();

            if (!user) {
                return res.status(404).json({
                    message: 'Not Found. Incorrect username or password'
                });
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return res.status(404).json({
                    message: 'Not Found. Incorrect username or password'
                });
            }

            if (user.status === 'blocked') {
                return res.status(403).json({
                    message: 'Forbidden. The user is blocked.'
                });
            }

            const token = generateToken({ ...user });
            delete user.password;
            return res.json({ user, token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Server Error" });
        }
    };

    authentication = async (req, res) => {
        try {
            const token = generateToken({ ...req.user });
            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Server Error" });
        }
    };
}

module.exports = new UserController();