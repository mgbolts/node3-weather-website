const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWdib2x0cyIsImEiOiJjazlvMDJxYmswN3k1M2dtemViNWlkZWp0In0.PobEGKFb0ded6jSBbSGs5g&limit=1'
    request({
        url: url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location API services.', undefined)
        } else if (body.features.length === 0) {
            callback('Invalid location information, try again.', undefined)
        } else {
            console.log('------------------')
            console.log(body.features[0].center[1])
            console.log(body.features[0].center[0])
            console.log(body.features[0].place_name)
            console.log('------------------')

            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                placeName : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode