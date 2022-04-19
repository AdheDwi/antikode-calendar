import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { isEmailValidate } from "../../helpers";
import { deleteEventAction } from "../../redux/actions/eventActions";

const ModalDetail = (props) => {
  const dispatch = useDispatch();

  console.log(props);

  const today = dayjs().format("YYYY-MM-DDTHH:mm");
  const manipulateDate = dayjs(props?.data?.date)
    .startOf("day")
    .format("YYYY-MM-DDTHH:mm");

  const [name, nameChange] = useState({ value: "", error: null });
  const [date, dateChange] = useState({
    value: today,
    error: null,
  });
  const [email, emailChange] = useState({ value: "", error: null });
  const [guestList, guestListChange] = useState([
    { email: "adhedw309@gmail.com", type: "Organizer" },
  ]);

  useEffect(() => {
    if (props.open) {
      dateChange({ value: manipulateDate, error: null });
    }
  }, [props.open]);

  const setInitState = () => {
    emailChange({ value: "", error: null });
    nameChange({ value: "", error: null });
    dateChange({
      value: today,
      error: null,
    });
    guestListChange([{ email: "adhedw309@gmail.com", type: "Organizer" }]);
  };

  const addGuest = (e) => {
    if (e.key === "Enter") {
      const emailCheck = guestList.filter((item) => item.email === email.value);
      if (!isEmailValidate(email.value)) {
        emailChange({ ...email, error: "Invalid email address" });
      } else if (emailCheck?.length > 0) {
        emailChange({ ...email, error: "Guest has been invited" });
      } else {
        const newGuest = { email: email.value, type: "Guest" };
        const newGuestList = guestList.concat(newGuest);
        guestListChange(newGuestList);
        setTimeout(() => {
          emailChange({ value: "", error: null });
        }, 150);
      }
    }
  };

  const onDelete = (id) => {
    dispatch(deleteEventAction(id));
    setTimeout(() => {
      setInitState();
      props.closeDialog();
    }, 150);
  };

  return (
    <Modal isOpen={props.open} toggle={props.closeDialog}>
      <ModalHeader toggle={props.closeDialog}>Detail Event</ModalHeader>
      <ModalBody>
        <div className="event-detail-box">
          <div className="event-detail-title">
            <div className={`event-color ${props.data.color}`} />
            <h2>{props.data.eventName}</h2>
          </div>
          <div className="event-detail-time">
            <p>{props.data.eventTime}</p>
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
      <ModalFooter>
        <Button
          className="button button-primary"
          onClick={() => props.openEdit({ data: props.data, type: "edit" })}
        >
          Edit Event
        </Button>
        <Button
          className="button button-primary"
          onClick={() => onDelete(props.data._id)}
        >
          Delete Event
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDetail;
