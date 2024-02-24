//METHOD-1
 const https = require('https')
 exports.postWeather = async(req, res, next) => {
     let cityName = req.body.city
     const api_key = '762175afb21fe39a832eb071daa006c2'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
       https.get(url, (response) => {
         response.on('data', (data) => {
            try {
             const weatherData = JSON.parse(data)
             res.json({
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description
             })
             }
             catch {
                return next(new HttpError('Try again later', 404))
             }
         })
     })
 }

//METHOD-2
// const axios = require('axios')
// const HttpError = require('../middlewares/http-error')
// exports.postWeather = async(req, res, next) => {
//     try{
//         let cityName = req.body.city
//         const api_key = '762175afb21fe39a832eb071daa006c2'
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`
//         const response = await axios.get(url)
//         const weatherData = response.data
//         res.json({
//             temperature: weatherData.main.temp,
//             description: weatherData.weather[0].description
//         })
//     }
//     catch(err){
//         return next(new HttpError('Try again later', 404))
//     }
// }