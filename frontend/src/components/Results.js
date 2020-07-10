import React, { Component } from "react";
import { Row, Spinner, DropdownButton, Dropdown, Col } from "react-bootstrap";
import { Cards, Context } from "./index";

export class Results extends Component {
  state = {
    sortMethods: ["Low to High", "High to Low"],
    sortTitle: "Low to High",
  };
  render() {
    const {
      currentPage,
      resultPerPage,
      results,
      loading,
      resultStateMessage,
    } = this.context.state;
    const resultpage = [15, 25, 50, 100, 500];
    const { sortTitle, sortMethods } = this.state;

    if (typeof results != typeof []) {
      return (
        <center className="justify-content-center text-light">
          <div className="text-light">
            <h1>Backend didn't respond</h1>
            <h1>{results}</h1>
          </div>
        </center>
      );
    }
    let resultsSorted = [...results];
    resultsSorted.sort((a, b) => a.price - b.price);
    if (sortTitle === sortMethods[1]) {
      resultsSorted.reverse();
    }
    const indexOfLastResult = currentPage * resultPerPage;
    const indexOfFirstResult = indexOfLastResult - resultPerPage;
    const currentResult = resultsSorted.slice(
      indexOfFirstResult,
      indexOfLastResult
    );

    const resultState = () => {
      return results.length === 0 ? (
        <center className="justify-content-center text-light">
          {loading === true ? <Spinner animation="border" role="status" /> : ""}
          <div className="text-light">{resultStateMessage}</div>
        </center>
      ) : (
        <React.Fragment>
          <Row className="row d-flex" style={{ margin: "0.7rem" }}>
            <Col className="text-center w-10">
              <DropdownButton title={"Result Per Page"}>
                {resultpage.map((method, i) => (
                  <Dropdown.Item
                    eventKey={i}
                    key={i}
                    active={method === 18}
                    onClick={() => this.context.changeResultPerPage(method)}
                  >
                    {method}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col className="text-center">
              <DropdownButton title={sortTitle}>
                {sortMethods.map((method, i) => (
                  <Dropdown.Item
                    eventKey={i}
                    key={i}
                    active={method === sortTitle}
                    onClick={() => this.setState({ sortTitle: method })}
                  >
                    {method}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <Row
            className="row d-flex justify-content-center"
            style={{ margin: "0rem" }}
          >
            {currentResult.map((item, i) => (
              <Cards
                key={i}
                title={item.title}
                price={item.price}
                link={item.link}
                img={item.img}
                website={item.website}
              />
            ))}
          </Row>
        </React.Fragment>
      );
    };

    return resultState();
  }
}
Results.contextType = Context;
