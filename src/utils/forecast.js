//jshint esversion: 8

const request = require('request');

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=d24704f63bf83b0c1723299d7b8d5903&query=' + lat + ',' + long + '&units=f';

  request({url: url, json: true}, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees.');
    }
  });
};

module.exports = forecast;
