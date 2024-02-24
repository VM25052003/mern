const express = require('express')
const bodyParser = require('body-parser')

const taskRoutes = require('./routes/task-routes')
const mongoose = require('mongoose')
const app = express()
//Setting views

//Parsing to json
app.use(bodyParser.json())

//Forwarding 
app.use('/tasks', taskRoutes)

//Error detection
app.use((err, req, res, next) => {
    // Handle the error and send an appropriate response to the client
    res.status(err.codes || 500).json({ message: err.message || 'An unknown error occurred.' });
});

//Starting server
mongoose.connect('mongodb+srv://mathurvidhi2505:%24VidhiM%4025@cluster0.mjodwc6.mongodb.net/todo?authSource=admin&readPreference=primary').then(() => app.listen(3000)).catch((err) => console.log(err))
