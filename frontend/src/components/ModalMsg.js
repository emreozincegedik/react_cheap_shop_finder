import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export class ModalMsg extends Component {
  render() {
    const { setShow, handleClose, title, description } = this.props;
    return (
      <Modal show={setShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
