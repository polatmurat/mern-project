const { body } = require('express-validator')

const registerValidations = [
    body('name').trim().escape().custom(value => {
        if (!value) throw new Error('Name is required.')
        if (value.length < 3) throw new Error('Name must be at least 3 character')
    }),
    body('email').trim().isEmail().normalizeEmail().withMessage('Email is required.'),
    body('username').trim().escape().custom(value => {
        if (!value) throw new Error('Username is required.')
        if (value.length < 3) throw new Error('Username must be at least 3 character')
    }),
    body('password').trim().escape().custom(value => {
        if (!value) throw new Error('Password is required.')
        if (value.length < 6) throw new Error('Password must be at least 6 character')
    })
]

const loginValidations = [
    body('username').trim().escape().custom(value => {
        if (!value) throw new Error('Please enter a valid username.')
        if (value.length < 3) throw new Error('Please enter a valid username.')
    }),
    body('password').trim().escape().custom(value => {
        if(!value) throw new Error('Password is required.')
    })
]