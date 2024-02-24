const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid');

const USERS = [
    {
    id: '123',
    name: 'ABC',
    email: 'ABC@gmail.com',
    password: 'ABC'
    },
    {
    id: '456',
    name: 'DEF',
    email: 'DEF@gmail.com',
    password: 'DEF'
    }
]

const getUsers = (req, res, next) => {
    res.json({users: USERS})
}

const signup = (req, res, next) => {
    //Extracting from request body
    const { name, email, password } = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()){
    throw new HttpError('Invalid Input Fields', 422)
}

     //User already exists
     const hasUser = USERS.find(u => u.email === email)
     if(hasUser){
        throw new HttpError('User Already Exist', 422)
     }

    //Creating user with that data and storing in USERS[], short for name: name is name
    const createUser = {
        id: uuidv4(),
        name,
        email,
        password
    }
    USERS.push(createUser)

    //Return response
    res.status(201).json({users: createUser});
}

const login = (req, res, next) => {
    //Extracting from request body
    const { extractedEmail, extractedPassword } = req.body

    //Find user existing with that email
    const identifiedUser = USERS.find(u => u.email === extractedEmail)

    //Either unexisting user or incorrect password
    if(!identifiedUser || identifiedUser.password !== extractedPassword){
        throw new HttpError('No User Found', 404)
    }

    //Send response
    res.json({ users: "Logged In" })
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login
