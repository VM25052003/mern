const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moviesRoutes = require('./routes/moviesRoutes')

const app = express()
//Setting views

//Parsing
app.use(bodyParser.json())

//Forwarding
app.use('/movies', moviesRoutes);

//Error detection
app.use((err, req, res, next) => {
    res.json({message: 'No found'}).status(404)
})

//Starting server
mongoose.connect('mongodb+srv://mathurvidhi2505:%24VidhiM%4025@cluster0.mjodwc6.mongodb.net/practice_moviesDB?authSource=admin&readPreference=primary').then(() => app.listen(3000)).catch(err => console.log('can not connect'))
