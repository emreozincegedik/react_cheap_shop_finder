import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { ModalMsg } from "../components";

export class Suggestion extends Component {
  componentDidMount() {
    document.title += " Suggestion";
    document.getElementById("suggestion").value = "";
  }
  state = {
    setShow: false,
    suggestionControl: { display: "none" },
    suggestionLength: 0,
    placeHolder: "Min 10 characters",
  };
  suggestionHandle = (event) => {
    event.preventDefault();
    const { email, suggestion } = event.target;
    if (suggestion == null) {
      this.setState({
        suggestionControl: {
          display: "block",
        },
        placeHolder: "Suggestion can't be empty",
      });
      return;
    }
    if (suggestion.value > 300) {
      this.setState({
        suggestionControl: {
          display: "block",
        },
        placeHolder: "Suggestion can't be more than 300 characters",
      });
      return;
    }
    if (suggestion.value.length < 10) {
      this.setState({
        suggestionControl: {
          display: "block",
          placeHolder: "Min 10 characters",
        },
      });
      return;
    }
    console.log(email.value, suggestion.value);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value == null ? "" : email.value,
        suggestion: suggestion.value == null ? false : suggestion.value,
      }),
    };
    fetch("/suggestion", requestOptions);

    this.handleShow();

    //db connection
  };
  handleClose = () => {
    /* this.setState({setShow:false}); */
    window.location = "/";
  };
  handleShow = () => {
    this.setState({ setShow: true });
  };

  suggestionLength = () => {
    this.setState({
      suggestionLength: document.getElementById("suggestion").value.length,
    });
  };

  render() {
    const {
      setShow,
      suggestionLength,
      suggestionControl,
      placeHolder,
    } = this.state;

    return (
      <div className="container align-middle">
        <ModalMsg
          setShow={setShow}
          handleClose={this.handleClose}
          title="Thank you!"
          description="Your suggestion has been received."
        />

        <Form className="align-middle" onSubmit={this.suggestionHandle}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email (optional)" />
          </Form.Group>
          <Form.Group controlId="suggestion">
            <Form.Label>Your Suggestion:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder={placeHolder}
              required
              maxLength="300"
              onChange={this.suggestionLength}
            />
            <p className="d-flex justify-content-end" role="alert">
              {suggestionLength}/300
            </p>
            <div className="alert alert-danger" style={suggestionControl}>
              {placeHolder}
              <Button
                className="close"
                onClick={() =>
                  this.setState({ suggestionControl: { display: "none" } })
                }
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
