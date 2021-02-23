//jshint esversion: 8

const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGNnYXRvcjM4IiwiYSI6ImNrbDFsbjY3azMzcDQyd3FtN3Q4bXl4Nm8ifQ.qxn5zfv9DbLyeLS21edq4g&limit=1';

  request({url: url, json: true}, (err, { body }) => {
      if (err) {
        callback('Unable to connect to location services');
      } else if (body.features.length === 0) {
        callback('Location not found');
      } else {
        const lat = body.features[0].center[1];
        const long = body.features[0].center[0];
        const placeName = body.features[0].place_name;
        // callback(undefined, {lat: lat, long: long, name: placeName});
        callback(undefined, {lat, long, placeName});
      }
  });
};



module.exports = geocode;
