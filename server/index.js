const express = require("express");
const bodyparser = require("body-parser");
// const db = require("./../database/index");
const api_helpers = require("./../api_helpers");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "/../client/dist")));

app.post("/estimates", (req, res) => {
  // convert start and end addresses to lat-lng via Google Maps API helper
  console.log(req.body);
  let { start_address, end_address } = req.body;
  let startLatLng, endLatLng;
  api_helpers
    .toLatLng(start_address)
    .then(latLng => {
      startLatLng = latLng;
      return api_helpers.toLatLng(end_address);
    })
    // convert lat-lngs to array of price subestimates via Uber API helper
    .then(latLng => {
      endLatLng = latLng;
      return api_helpers.fetchUberSubEstimates(
        startLatLng.lat,
        startLatLng.lng,
        endLatLng.lat,
        endLatLng.lng
      );
    })
    // create and save estimate and subestimates to Mongo DB via DB helpers
    .then(prices => {
      console.log("prices retrieved from Uber:");
      console.log(prices);
      return db.save(prices);
    })
    // return estimate info to client
    .then(estimate => res.send(estimate))
    .catch(err => console.log(err));
});
app.get("/estimates", (req, res) => {
  res.send("coming!");
});

if (process.env.PORT) {
  var PORT = process.env.PORT;
} else {
  var PORT = 3010;
}

app.listen(PORT, () =>
  console.log(`Placeholder app listening on port ${PORT}!`)
);
