const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?types=country&access_token=pk.eyJ1IjoiaGFyaWdhZGhhaSIsImEiOiJjajhvdzBxMWIwOXRsMnhxY3lzdTBmYWM2In0.DZBLLZXnhq1TA5gRgC0Mjw';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to the location service', undefined);
        } else if(body.error) {
            callback('unable to find location. Try another search', undefined);
        } else if(!(body.features.length > 0)){
            callback('feature array empty', undefined);            
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    });
}

module.exports = geocode;



