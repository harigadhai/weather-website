const path = require('path');
const express = require('express');
const app = new express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


// Define paths for Express config
const publicpath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup forr handlebar engine and locations
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// general
app.use(express.static(publicpath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'harry',
        age: 22,
        title:'home1111'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'harry',
        age: 22,
        title:'Help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'harry',
        age: 22,
        title:'About Us'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
         return res.send({
             error:'oops!! you must provide a address !!!'
         });
    } 
 
    geocode(req.query.address, (error, {lat, lng, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(lat, lng, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location
            });
        });
    });
     
 });

app.get('/products', (req, res) => {
   if(!req.query.search) {
        return res.send({
            error:'oops!! you must provide a search term!!!'
        });
   } 

    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'harry',
        age: 22,
        title:'404 page not found'
    });
});

app.listen(4000, () => {
    console.log('listening port 4000');
});

