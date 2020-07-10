import { Card } from "react-bootstrap";
import React, { Component } from "react";

export class Cards extends Component {
  render() {
    const titleSize = (title) => {
      return title.length > 20 ? 15 : 25;
    };
    return (
      <Card
        className="text-center"
        style={{
          width: "13.4rem",
          margin: "0.1rem",
          padding: "0.1rem",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            padding: "0.3rem",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Card.Img
            className="zoom border border-primary rounded"
            style={{ width: "5rem", marginRight: "0.2rem" }}
            src={this.props.img || "img.jpg"}
          />
          <Card.Title style={{ fontSize: titleSize(this.props.title) }}>
            {this.props.title || "title"}
          </Card.Title>
        </Card.Body>
        <Card.Text>{this.props.price || "???"} TL</Card.Text>
        <Card.Link
          className="btn btn-primary btn-block align-self-end"
          target="_blank"
          rel="noopener noreferrer"
          href={this.props.link}
        >
          Go to {this.props.website || "website"}
        </Card.Link>
      </Card>
    );
  }
}
