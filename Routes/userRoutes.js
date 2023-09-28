const express = require('express')
const userController = require('../Controllers/userControllers.js')
const router = express.Router()



router.post("/signup", userController.signUp)


module.exports = router