const HttpError = require('../models/http-error')
const { validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user')

    /* {
     "name": "ABC",
     "email": "abcd@gmail.com",
     "password": "ABCDEFG",
     "places": "P1"
     }
     {
     "name": "DEF",
     "email": "defg@gmail.com",
     "password": "DEFGHIJ",
     "places": "P2"
     } */

const getUsers = async(req, res, next) => {
    let users;
    try {
//We want to find certain fields only, Use 'email name' to include these or '--password' to exclude it
        users = await User.find({}, '--password')
    }
    catch {
        return next(new HttpError('Something went wrong. Try again later', 500))
    }

    //As already set in model, else users.map(u => u.toObject({getters: true}))
    res.json({users: users})
}

const signup = async(req, res, next) => {
    //Extracting from request body
    const { name, email, password } = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input Fields', 422))
    }

    let existingUser;
    //Check is already exist
    try {
        existingUser = await User.findOne({ email: email })
    }
    catch {
        return next(new HttpError('Something went wrong. Try again later', 500))
    }

    if(existingUser){
        return next(new HttpError('User already exist, login instead', 422))
    }

    //Creating user with that data and storing, short for name: name is name
    const createUser = new User({
        name,
        email,
        password,
        image: 'https://hips.hearstapps.com/hmg-prod/images/close-up-of-purple-crocus-flowers-united-kingdom-uk-royalty-free-image-1674159456.jpg',
        //Initially no places for a new user
        places: []
    })
    
try { 
    await createUser.save()
    res.status(201).json({ user: createUser })
} 
catch {
    return next(new HttpError('Something went wrong. Try again later'))
}
}

const login = async(req, res, next) => {
    //Extracting from request body
    const { email, password } = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid Input Fields', 422))
    }

    //Find user existing with that email
    let identifiedUser;
    try {
        identifiedUser = await User.findOne({ email: email })
    }
    catch {
        return next(new HttpError('Something went wrong. Try again later', 500))
    }

    //Either unexisting user or incorrect password
    if(!identifiedUser || identifiedUser.password !== password){
        return next(new HttpError('Invalid credentials. Please try again', 404))
    }

    //Send response
    res.json({ users: "Logged In" })
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login
