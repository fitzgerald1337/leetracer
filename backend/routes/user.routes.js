const express = require('express')
const userController = require('../controllers/user.controller')
const { route } = express

route.post('/register', userController.postSignup)

module.exports = route