import React, { Component } from "react";
import { Context } from "./SearchProvider";
import { PriceFilter } from "./index";
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export class Search extends Component {
  render() {
    return (
      <Context.Consumer>
        {(context) => (
          <Container>
            <Form onSubmit={context.onSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  id="query"
                  placeholder="Search"
                  required
                  autoFocus
                />
                <InputGroup.Append>
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Row>
                <Col>
                  {this.context.state.availableCheckboxes.map((checkbox) => (
                    <Form.Check
                      className="text-light"
                      key={checkbox}
                      type="checkbox"
                      id={checkbox}
                      label={checkbox}
                      inline
                      defaultChecked
                    />
                  ))}
                </Col>
                <Col className="mb-1" md="4">
                  <PriceFilter />
                </Col>
                <Col md="auto"></Col>
              </Row>
            </Form>
          </Container>
        )}
      </Context.Consumer>
    );
  }
}
Search.contextType = Context;
