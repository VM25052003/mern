const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

const app = express()

//Parse any incoming request having json data and the reach next middlewares in line. Moves from top -> bottom
app.use(bodyParser.json())

//Forward to placesRoutes only if request starts with /places
app.use('/places', placesRoutes)

//Forward to usersRoutes only if request starts with /users
app.use('/users', usersRoutes)

//Those coming after above routes are request basically that didn't got a response. 
app.use((req, res, next) => {
    throw new HttpError('Page not found', 404)
})

//To avoid code duplication for error handling each time as have to set header to 404 and send message each time. Middleware taking 4 arg. is treated by express as special middleware for error handling
app.use((error, req, res, next) => {
    //Headers set means already send a response
    if(res.headerSent){
        return next(error)
    }
    //Othewise set header and error msg
    res.status(error.code || 500).json({message: error.message || 'An unknown error occurred'})
})

//Connect to db
mongoose.connect('mongodb+srv://mathurvidhi2505:%24VidhiM%4025@cluster0.mjodwc6.mongodb.net/places?authSource=admin&readPreference=primary').then(() =>  app.listen(5000)).catch(err => console.log(err))
