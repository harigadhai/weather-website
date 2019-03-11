const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/8894cd4da5ae3069919b8059ec26aeca/'+lat+','+lng;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to the weather service', undefined);
        } else if(body.error) {
            console.log('errorrrr')
            callback('unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'it is currently '+body.currently.temperature +' degree out. There is a'+ body.currently.precipProbability+'% chance of rain');
        }
    });
}

module.exports = forecast;