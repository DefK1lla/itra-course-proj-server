const { body } = require('express-validator');

module.exports = registerValidation = [
    body('username').isLength({ min: 3, max: 13 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 25 }),
];