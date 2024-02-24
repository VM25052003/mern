const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/url-routes')
const app = express()

//Setting views
//Parsing
app.use(bodyParser.json())

//Forwarding
app.use('/url', urlRoutes);

//Error handling
app.use((err, req, res, next) => {
    res.status(500).json({message: err.message || 'Not found'})
})

//Server setup
mongoose.connect('mongodb+srv://mathurvidhi2505:%24VidhiM%4025@cluster0.mjodwc6.mongodb.net/practice_DB?authSource=admin&readPreference=primary').then(() => app.listen(3000)).catch(err => console.log(err))