const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/User');
const { SECRET_KEY } = require('../config/config');

const generateToken = (id, email, role) => {
    return jwt.sign({
        id,
        email,
        role
    }, SECRET_KEY, {
        expiresIn: '1h'
    });
}

const checkUserExistence = async (username, email) => {
    const checkByUsername = await User.findOne({ username }).lean();

    if (checkByUsername) {
        return {
            field: 'username',
            message: 'A user with this name exists'
        };
    }

    const checkByEmail = await User.findOne({ email }).lean();

    if (checkByEmail) {
        return {
            field: 'email',
            message: 'A user with this email exists'
        };
    };
}

class UserController {
    registration = async (req, res) => {
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

        const token = generateToken(user._id, user.username, user.email, user.role);

        return res.json({
            user: {
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    };

    login = async (req, res) => {
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
                message: 'Incorrect username or password'
            });
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return res.status(404).json({
                message: 'Incorrect username or password'
            });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }

        const token = generateToken(user._id, user.username, user.email, user.role);
        delete user.password;
        return res.json({ user, token });
    };

    authentication = async (req, res) => {
        const token = generateToken({ ...req.body.user });
        return res.json({ token });
    };
}

module.exports = new UserController();