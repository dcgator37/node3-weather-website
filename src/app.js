//jshint esversion: 8
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Brent Baker'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Brent Baker'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'Help message',
    title: 'Help',
    name: 'Brent Baker'
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must search for an address'
    });
  }

  geocode(req.query.address, (error, {lat, long, placeName} = {}) => {
    if (error) {
      return res.send({error: 'Bad location'});
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        forecast: forecastData,
        location: placeName,
        address: req.query.address
      });

    });
  });


});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Brent Baker',
    msg: 'Help article not found'});
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Brent Baker',
    msg: 'Page not found'});
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
