import React, { Component } from "react";
import { Search, SearchProvider, Results, Paginations } from "../components";
import { Container } from "react-bootstrap";

export class Main extends Component {
  render() {
    return (
      <SearchProvider>
        <Container fluid>
          <Search />
          <br />
          <Results />
          <br />
          <div className="row d-flex justify-content-center">
            <Paginations />
          </div>
        </Container>
      </SearchProvider>
    );
  }
}
