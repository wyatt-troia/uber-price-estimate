const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/uberEstimator')
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose connection open!'));

var estimateSchema = new mongoose.Schema({
  rideTier: String,
  distance: Number,
  highEstimate: Number,
  lowEstimate: Number,
  duration: Number,
  estimateString: String,
  currency: String,
  start_latitude: Number,
  start_longitude: Number,
  end_latitude: Number,
  end_longitude: Number,
  start_address: String,
  end_address: String
});

var Estimate = mongoose.model('Estimate', estimateSchema);

const save = ({display_name, distance, high_estimate, low_estimate, duration, estimate, currency_code, 
start_latitude, start_longitude, end_latitude, end_longitude, start_address, end_address}) => {
  let props = {
    rideTier: display_name,
    distance,
    highEstimate: high_estimate,
    lowEstimate: low_estimate,
    duration,
    estimateString: estimate,
    currency: currency_code,
    start_latitude,
    start_longitude,
    end_latitude, 
    end_longitude,
    start_address,
    end_address
  }
  var estimate = new Estimate(props);
  console.log(estimate);
  estimate.save()
    .then((estimate) => {
      console.log('saved new estimate to db');
      console.log(estimate);
    })
    .catch((err) => {
      console.log(err);
    });
};

var sample = JSON.parse('{"localized_display_name": "uberX","distance": 6.17,"display_name": "uberX","product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d","high_estimate": 17,"low_estimate": 13,"duration": 1080,"estimate": "$13-17","currency_code": "USD"}')
sample.start_address = '300 Albany St';
save(sample);
const fetch = () => {

};

module.exports.save = save;
module.exports.fetch = fetch;
