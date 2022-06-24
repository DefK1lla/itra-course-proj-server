const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/User');
const { SECRET_KEY } = require('../utils/config');

const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');

const generateToken = ({ _id, email, role }) => {
    return jwt.sign({
        _id,
        email,
        role
    }, SECRET_KEY, {
        expiresIn: '24h'
    });
}

class UserController {
    registration = async (req, res) => {
        try {
            const user = await userService.create(req.body);
            const token = generateToken({ ...user });

            return res.json({ user, token });
        } catch (e) {
            console.log(e);
            errorHandler(res, e);
        }
    };

    login = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await userService.login();
            const token = generateToken({ ...user });

            return res.json({ user, token });
        } catch (e) {
            console.log(e);
            errorHandler(res, e);
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