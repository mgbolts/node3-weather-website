console.log('Client Side JS file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading Weather Data for: ' + location
    messageTwo.textContent = ''
    messageThree.textContent = ''

    searchURL = '/weather?address=' + location
    console.log(searchURL)
    fetch(searchURL).then((response) => {
        response.json().then((weatherData) => {
            if (weatherData.error) {
                messageOne.textContent = 'Error loading Data!'
                messageTwo.textContent = weatherData.error
                console.log(weatherData.error)

            } else {
                messageOne.textContent = ''
                messageTwo.textContent = (weatherData.location)
                messageThree.textContent = (weatherData.forecast)

                console.log(weatherData)
            }
        })
    })

    // console.log(location)
})