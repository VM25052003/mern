const express = require('express')
const router = express.Router()
const weatherController = require('../controllers/weather-controllers')

//GET /weather
router.post('/', weatherController.postWeather)

module.exports = router