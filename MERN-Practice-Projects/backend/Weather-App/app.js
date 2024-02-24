const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const weatherRouter = require('./routes/weather-routes') 

//Parse json
app.use(bodyParser.urlencoded({extended:true}))

app.get('/weather', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//Forwarding
app.use('/weather', weatherRouter)

//Error Handling
app.use((err, req, res, next) => {
    res.json({message: err.message || 'An error occurred'}).status(err.codes || 500)
})

//Start server
app.listen(3000)
