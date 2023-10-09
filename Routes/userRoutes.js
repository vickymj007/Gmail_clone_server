const express = require('express')
const userController = require('../Controllers/userControllers.js')
const router = express.Router()



router.get("/", userController.showAllUsers)
router.post("/signup", userController.signUp)
router.post("/signin", userController.signIn)
router.post("/send-email", userController.sendEmail)
router.delete("/move-to-trash/:userID/:mailID", userController.moveToTrash)
router.delete("/delete-from-trash/:userID/:mailID", userController.deleteFromTrash)
router.delete("/delete-from-inbox/:userID/:mailID", userController.deleteFromInbox)


module.exports = router