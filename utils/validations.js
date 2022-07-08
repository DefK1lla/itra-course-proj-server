const { body } = require('express-validator');

const registerValidation = [
   body('username', 'Enter username. Minimum 3 characters. Maximum 13 characters').isLength({ min: 3, max: 13 }),
   body('email', 'Enter your email').isEmail(),
   body('password', 'Enter password. Minimum 5 characters. Maximum 25 characters').isLength({ min: 5, max: 25 }),
];

const collectionValidation = [
   body('title', 'Enter collection title').isLength({ min: 3 }).isString(),
   body('description', 'Enter collection description. Maximum 10 characters').isLength({ min: 15 }).isString(),
   body('theme', 'Enter collection theme (books, sad, sadsa'),
   body('imgSrc', 'Incorrect link').optional().isURL()
];

module.exports = { registerValidation, collectionValidation };