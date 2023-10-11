const { body } = require('express-validator')


const userValidations = {
    registerValidations: [
        body('name').trim().escape().notEmpty().withMessage('Name is required.').isLength({min: 3 }).withMessage('Name must be at least 3 characters.'),
        body('email').trim().isEmail().normalizeEmail().withMessage('Enter a valid email.'),
        body('username').trim().escape().notEmpty().withMessage('Username is required.').isLength({ min: 3 }).withMessage('Username must be at least 3 characters.'),
        body('password').trim().escape().notEmpty().withMessage('Password is required.').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    ],
    loginValidations: [
        body('username').trim().escape().notEmpty().withMessage('Please enter a valid username.').isLength({ min: 3 }).withMessage('Please enter a valid username.'),
        body('password').trim().escape().notEmpty().withMessage('Password is required.'),
      ]
}

module.exports = userValidations;
