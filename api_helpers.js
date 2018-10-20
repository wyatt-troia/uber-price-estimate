const axios = require('axios');
const tokens = require('./config')

const fetchUberSubEstimates = (start_latitude, start_longitude, end_latitude, end_longitude) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://api.uber.com/v1.2/estimates/price',
      headers: {
        'Authorization': `Token ${tokens.uber}`,
        'Accept-Language': 'en_US',
        'Content-Type': 'application/json'
      },
      params: {
        start_latitude,
        start_longitude,
        end_latitude,
        end_longitude
      }
  
    })
      .then((response) => {
        // returns array of subestimate objects
        resolve(response.data.prices);
      })
      .catch((err) => {
        console.log(`UBER API err: ${err}`);
        reject(err);
      });
  })
};
// fetchUberSubEstimates(37.7752315, -122.418075, 37.7752415, -122.518075)
//   .then((prices) => console.log(prices));

const toLatLng = (address) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json`,
      params: {
        address,
        key: tokens.google
      }
    })
      .then((response) => {
        // returns { lat, lng }
        resolve(response.data.results[0].geometry.location);
      })
      .catch((err) => {
        reject(err);
      })
  });
}

// toLatLng('300 Albany St, New York, NY');

exports.fetchUberSubEstimates = fetchUberSubEstimates;
exports.toLatLng = toLatLng;