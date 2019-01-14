# Uber Price Estimator

A single-page app that fetches real-time price and duration estimates of Uber rides, built using [React](https://reactjs.org/), [React Bootstrap](https://react-bootstrap.netlify.com/), and [Express](http://expressjs.com/). Origin and destination input is converted via the [Google Maps API](https://developers.google.com/maps/documentation/) to longitude-latitude coordinates, which are then provided to the [Uber API](https://developer.uber.com/) to generate the estimates. The use of the Google Maps API enables the app to intelligently handle a variety of user input, whether containing addresses, place names, or misspellings. 

![Demo](https://imgur.com/cXz5W0v.gif)

#### [Deployment](http://ec2-54-174-123-146.compute-1.amazonaws.com:3010/)

## Getting Started

```
npm install
npm run react-dev
npm run start
```
Then navigate to [http://localhost:3010](http://localhost:3010).

## Author

- **Wyatt Troia** - [Github](https://github.com/wyatt-troia)

## Acknowledgments

- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.netlify.com/)
- [Google Maps API](https://developers.google.com/maps/documentation/)
- [Uber API](https://developer.uber.com/)
- [Express](http://expressjs.com/)
