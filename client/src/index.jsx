import ReactDOM from "react-dom";
import React from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estimate: undefined
    };
    this.updateEstimate = this.updateEstimate.bind(this);
  }
  updateEstimate(estimate) {
    this.setState({
      estimate
    });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col
            md={{ span: 6, offset: 3 }}
            className="d-flex flex-column justify-content-center"
          >
            <h1 className="text-center mt-3 mb-4">Uber Price Estimator</h1>
            <Input updateEstimate={this.updateEstimate} />
            <Estimate estimate={this.state.estimate} />
          </Col>
        </Row>
      </Container>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_address: "",
      end_address: ""
    };
    this.handleStartAddressChange = this.handleStartAddressChange.bind(this);
    this.handleEndAddressChange = this.handleEndAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStartAddressChange(event) {
    this.setState({ start_address: event.target.value });
  }

  handleEndAddressChange(event) {
    this.setState({ end_address: event.target.value });
  }

  handleSubmit(event) {
    axios({
      method: "POST",
      url: "/estimates",
      data: {
        start_address: this.state.start_address,
        end_address: this.state.end_address
      }
    })
      .then(estimate => {
        console.log(estimate);
        this.props.updateEstimate(estimate.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form
        className="d-flex flex-column align-items-center mb-4"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          value={this.state.start_address}
          onChange={this.handleStartAddressChange}
          placeholder="Origin"
          className="rounded"
        />
        <br />
        <input
          type="text"
          value={this.state.end_address}
          onChange={this.handleEndAddressChange}
          placeholder="Destination"
          className="rounded"
        />
        <br />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </form>
    );
  }
}

function Estimate(props) {
  if (props.estimate) {
    return (
      <div>
        <h2 className="text-center mb-3">
          <b>Your Estimate:</b>
        </h2>
        <h3 className="text-center">
          Distance: {props.estimate.distance} miles
        </h3>
        <h3 className="text-center mb-3">
          Duration: {Math.floor(props.estimate.subEstimates[0].duration / 60)}{" "}
          minutes
        </h3>
        {props.estimate.subEstimates.map(subestimate => {
          return (
            <p className="text-center">
              {subestimate.rideTier}: {subestimate.estimateString}
            </p>
          );
        })}
      </div>
    );
  } else return null;
}

ReactDOM.render(<App />, document.getElementById("app"));
