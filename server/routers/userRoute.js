const express = require("express")
const router = express.Router()
const usersController = require("../controllers/usersController")

router.post('/register', usersController.register)//create new user
router.post('/login', usersController.login)//create new user
router.delete('/:id', usersController.deldeteUser)//delete user


module.exports = router