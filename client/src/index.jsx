import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
// import App from './app.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estimate: undefined
    }
    this.updateEstimate = this.updateEstimate.bind(this);
  }
  updateEstimate(estimate) {
    this.setState({
      estimate
    })
  }
  render() {
    return (
      <React.Fragment>
        <h1>Uber Price Estimator</h1>
        <Input updateEstimate={this.updateEstimate}/>
        <Estimate estimate={this.state.estimate}/>
      </React.Fragment>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_address: '',
      end_address: ''
    }
    this.handleStartAddressChange = this.handleStartAddressChange.bind(this);
    this.handleEndAddressChange = this.handleEndAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStartAddressChange(event) {
    this.setState({start_address: event.target.value})
  }

  handleEndAddressChange(event) {
    this.setState({end_address: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'POST',
      url: '/estimates',
      data: {
        start_address: this.state.start_address,
        end_address: this.state.end_address
      }
    })
      .then((estimate) => {
        console.log(estimate);
        this.props.updateEstimate(estimate.data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Origin: </label>
        <input type="text" value={this.state.start_address} onChange={this.handleStartAddressChange}></input>
        <br></br>
        <br></br>
        <label>Destination: </label>
        <input type="text" value={this.state.end_address} onChange={this.handleEndAddressChange}></input>
        <br></br>
        <br></br>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

function Estimate(props) {
  if (props.estimate) {
    return (
      <React.Fragment>
        <h2>Your Estimate:</h2>
        <h3>Distance: {props.estimate.distance} miles</h3>
        <h3>Duration: {Math.floor(props.estimate.subEstimates[0].duration / 60)} minutes</h3>
        {props.estimate.subEstimates.map((subestimate) => {
          return (
            <p>{subestimate.rideTier}: {subestimate.estimateString}</p>
          )
        })}
      </React.Fragment>
    )
  } else return null;
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);