const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passwordRoutes = require('./routes/password-route')

//Parsing
app.use(bodyParser.urlencoded({extended: true}))

//Forwarding
app.use('/password', passwordRoutes)

//Error handling
// app.use((req, res, next, err) => {
//     res.status(err.code || 500).json({message: err.message || 'An unknown error occured'})
// })

//Connecting to server
app.listen(3000)