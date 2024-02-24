const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const usersControllers = require('../controllers/users-controllers')

//GET /users to get list of all users
router.get('/', usersControllers.getUsers)

//POST /users/signup to sign user up
router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min: 6})
    ], usersControllers.signup)

//POST /users/login to log user in
router.post('/login', usersControllers.login)

module.exports = router