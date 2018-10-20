const mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/uberEstimator')
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongoose connection open!'));

var subEstimateSchema = new mongoose.Schema({
  rideTier: String,
  highEstimate: Number,
  lowEstimate: Number,
  duration: Number,
  estimateString: String,
  parentEstimate: { type: Schema.Types.ObjectId, ref: 'Estimate' }
});

var estimateSchema = new mongoose.Schema({
  user: String,
  currency: String,
  start_latitude: Number,
  start_longitude: Number,
  end_latitude: Number,
  end_longitude: Number,
  start_address: String,
  end_address: String,
  distance: Number
})

var subEstimate = mongoose.model('subEstimate', subEstimateSchema);
var Estimate = mongoose.model('Estimate', estimateSchema);

const save = (subEstimates) => {
  
  let {distance, estimate, currency_code, start_latitude, start_longitude, 
    end_latitude, end_longitude, start_address, end_address} = subEstimates[0];
  
  let estimateProps = {
    user: null,
    currency: currency_code,
    start_latitude,
    start_longitude,
    end_latitude,
    end_longitude,
    start_address,
    end_address,
    distance
  }; 

  var newEstimate = new Estimate(estimateProps);
  newEstimate.save()
    .then((savedEstimate) => {
      console.log(`saved a new estimate: ${estimate}`)
      var docs = [];
      console.log(`subEstimates: ${subEstimates}`);
      subEstimates.forEach((newSubEstimate) => {

        let {display_name, high_estimate, low_estimate, duration, estimate} = newSubEstimate
        let subEstimateProps = {
          rideTier: display_name,
          highEstimate: high_estimate,
          lowEstimate: low_estimate,
          duration,
          estimateString: estimate,
          parentEstimate: savedEstimate._id
        }
        docs.push(new subEstimate(subEstimateProps));

      });

      subEstimate.insertMany(docs)
        .then((subEstimates) => {
          console.log(`subEstimates saved!: ${subEstimates}`)
          subEstimate.find().populate('parentEstimate').exec()
            .then((subestimates) => {
              console.log(`populated subestimates: ${subestimates}`);
            })
            .catch((err) => console.log(`ERROR HEYAAA: ${err}`))
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

};

var sample = `{
  "prices": [
    {
      "localized_display_name": "POOL",
      "distance": 6.17,
      "display_name": "POOL",
      "product_id": "26546650-e557-4a7b-86e7-6a3942445247",
      "high_estimate": 15,
      "low_estimate": 13,
      "duration": 1080,
      "estimate": "$13-14",
      "currency_code": "USD"
    },
    {
      "localized_display_name": "uberX",
      "distance": 6.17,
      "display_name": "uberX",
      "product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d",
      "high_estimate": 17,
      "low_estimate": 13,
      "duration": 1080,
      "estimate": "$13-17",
      "currency_code": "USD"
    }
  ]}`
sampleSubEstimates = JSON.parse(sample).prices

console.log(sampleSubEstimates)
  
sampleSubEstimates[0].start_address = '300 Albany St, New York, NY';
sampleSubEstimates[0].end_address = '200 Broadway, New York, NY';
save(sampleSubEstimates);

const fetch = () => {

};

module.exports.save = save;
module.exports.fetch = fetch;
