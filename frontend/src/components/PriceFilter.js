import React, { Component } from "react";
import {
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export class PriceFilter extends Component {
  state = {
    dropdownText: "Between",
    dropdownItems: ["Between", "Lower Than", "Higher Than"],
  };
  render() {
    const { dropdownText, dropdownItems } = this.state;
    const list = () => {
      if (dropdownText === dropdownItems[0]) {
        return (
          <React.Fragment>
            <FormControl
              type="number"
              id="lowerPrice"
              placeholder="0"
              required
              defaultValue="0"
            />
            <FormControl
              type="number"
              id="higherPrice"
              placeholder="9999"
              required
              defaultValue="99999"
            />
          </React.Fragment>
        );
      }
      if (dropdownText === dropdownItems[1]) {
        return (
          <React.Fragment>
            <FormControl
              type="number"
              id="lowerPrice"
              placeholder="99999"
              required
              defaultValue="99999"
            />
          </React.Fragment>
        );
      }
      if (dropdownText === dropdownItems[2]) {
        return (
          <React.Fragment>
            <FormControl
              type="number"
              id="higherPrice"
              placeholder="0"
              required
              defaultValue="0"
            />
          </React.Fragment>
        );
      }
    };
    return (
      <InputGroup.Text style={{ padding: "0" }}>
        <InputGroup.Prepend>
          <DropdownButton title={dropdownText}>
            {dropdownItems.map((item, i) => (
              <Dropdown.Item
                key={i}
                eventKey={i}
                active={dropdownText === item}
                onClick={() => this.setState({ dropdownText: item })}
              >
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup.Prepend>
        {list()}
      </InputGroup.Text>
    );
  }
}
