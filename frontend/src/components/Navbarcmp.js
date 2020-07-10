import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export class Navbarcmp extends Component {
  render() {
    return (
      <Navbar sticky="top" bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/">Web Crawl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav /* className="mr-auto" */>
            <Nav.Link href="/suggestion">Suggestion</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
