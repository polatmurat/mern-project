const express = require('express')
const router = express.Router();
const { loginValidations, registerValidations } = require('../validations/userValidation')
const { login, register } = require('../controllers/userController')


router.post('/register', register)
router.post('/login', login)

module.exports = router;