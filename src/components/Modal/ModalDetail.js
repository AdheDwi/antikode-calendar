import React from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { deleteEventAction } from "../../redux/actions/eventActions";

const ModalDetail = (props) => {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteEventAction(id));
    setTimeout(() => {
      props.closeDialog();
    }, 150);
  };

  return (
    <Modal isOpen={props.open} toggle={props.closeDialog}>
      <ModalHeader className="event-modal-header" toggle={props.closeDialog}>
        Detail Event
      </ModalHeader>
      <ModalBody className="event-modal-body">
        <div className="event-detail-box">
          <div className="event-detail-title">
            <div className={`event-color ${props.data.color}`} />
            <h2>{props.data.eventName}</h2>
          </div>
          <div className="event-detail-time">
            <span class="material-icons">event</span>
            <p>
              {dayjs(props.data.eventTime).format("dddd, DD MMMM YYYY HH:mm")}
            </p>
          </div>
          <div className="event-detail-guest">
            <h4>Guest</h4>
            <div className="list-guest">
              {props.data.eventGuest?.map((item) => (
                <p key={item.email}>
                  {item.email} <span>{`(${item.type})`}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="event-modal-footer">
        <Button
          className="button button-icon"
          onClick={() => props.openEdit({ data: props.data, type: "edit" })}
        >
          Edit
        </Button>
        <Button
          className="button button-icon delete"
          onClick={() => onDelete(props.data._id)}
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDetail;
