import React, { useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { isEmailValidate } from "../../helpers";
import { addEventAction } from "../../redux/actions/eventActions";

const ModalEvent = (props) => {
  const dispatch = useDispatch();
  const [name, nameChange] = useState({ value: "", error: null });
  const [date, dateChange] = useState({
    value: dayjs().format("YYYY-MM-DDTHH:mm"),
    error: null,
  });
  const [email, emailChange] = useState({ value: "", error: null });
  const [guestList, guestListChange] = useState([
    { email: "adhedw309@gmail.com", type: "Organizer" },
  ]);

  const setInitState = () => {
    emailChange({ value: "", error: null });
    nameChange({ value: "", error: null });
    dateChange({ value: dayjs().format("YYYY-MM-DDTHH:mm"), error: null });
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

  const onSubmit = () => {
    const data = {
      _id: dayjs().format("YYYYMMDDHHmmss"),
      eventName: name.value,
      eventTime: date.value,
      eventGuest: guestList,
    };

    if (name.value.length < 1) {
      nameChange({ ...name, error: "Event name must be filled" });
    }
    if (date.value.length < 1) {
      dateChange({ ...date, error: "Event time must be filled" });
    }
    if (guestList.length < 2) {
      emailChange({ ...email, error: "Please invite guests" });
    }
    if (
      name.value.length > 0 &&
      date.value.length > 0 &&
      guestList.length > 1
    ) {
      dispatch(addEventAction(data));
      setTimeout(() => {
        setInitState();
        props.closeDialog();
      }, 150);
    }
  };

  return (
    <Modal isOpen={props.open} toggle={props.closeDialog}>
      <ModalHeader toggle={props.closeDialog}>Add Event</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label>Event Name</Label>
            <Input
              type="text"
              value={name.value}
              onChange={(e) =>
                nameChange({ value: e.target.value, error: null })
              }
              invalid={name.error}
            />
            <FormFeedback>{name.error}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Event Time</Label>
            <Input
              value={date.value}
              type="datetime-local"
              onChange={(e) =>
                dateChange({ value: e.target.value, error: null })
              }
              invalid={date.error}
            />
            <FormFeedback>{date.error}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Add Guest</Label>
            <Input
              value={email.value}
              type="email"
              onChange={(e) =>
                emailChange({ value: e.target.value, error: null })
              }
              invalid={email.error}
              onKeyDown={addGuest}
            />
            <FormFeedback>{email.error}</FormFeedback>
            {guestList?.length > 1 && (
              <div className="list-guest">
                {guestList?.map((item) => (
                  <p key={item.email}>
                    {item.email} <span>{`(${item.type})`}</span>
                  </p>
                ))}
              </div>
            )}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="button button-primary" onClick={() => onSubmit()}>
          Save Event
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalEvent;
