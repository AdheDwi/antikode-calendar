import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalEvent = (props) => {
  return (
    <Modal toggle={props.closeDialog}>
      <ModalHeader toggle={props.closeDialog}>Add Event</ModalHeader>
      <ModalBody>{props.data}</ModalBody>
    </Modal>
  );
};

export default ModalEvent;
