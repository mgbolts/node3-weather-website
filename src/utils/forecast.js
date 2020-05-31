const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=83ea208c8659647569d19d7462fc886b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    // console.log(url)
    request({
        url,
        json: true
    }, (error, {body}) => {
        // const {success, } =  response.body
        if (error) {
            callback('Weather data api connection is not working', undefined)
        } else if (body.success === false) {
            callback(body.error.info, undefined)
        } else {
            const weatherData = 'The forecast is ' + body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + ' degrees celcius.'

            console.log(weatherData)
            callback(undefined, weatherData)
        }
    })
}

module.exports = forecast