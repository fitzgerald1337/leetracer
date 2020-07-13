const express = require('express')
const userController = require('../controllers/user.controller')
const { route } = express

route.post('/user', userController.postSignup)

module.exports = route