const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define view engine and path HBS template views 
const hbsViewsPath = path.join(__dirname, '../template/views')
app.set('view engine', 'hbs')
app.set('views', hbsViewsPath)

// define partials template path
const hbsPartialsPath = path.join(__dirname, '../template/partials')
hbs.registerPartials(hbsPartialsPath)

// define Express public path
const pubDirPath = path.join(__dirname, '../public')
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Home',
        name: 'Micky Dee',
        temp: 28
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Micky Dee',
        temp: 28
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Micky Dee',
        msg: 'You need help :)'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    console.log(req.query.address)
    geoCode(req.query.address, (error, {
        latitude,
        longitude,
        placeName: location
    } = {}) => {
        // console.log(latitude)
        // console.log(longitude)
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
                latitude: latitude,
                longitude: longitude
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    // console.log(req.query.search)
    res.send({
        products: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404default', {
        title: 'Error 404',
        name: 'Mark Bolton',
        errorMsg: 'Error 404, Help document is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404default', {
        title: 'Error 404',
        name: 'Mark Bolton',
        errorMsg: 'Error 404, page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})