import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Alert,
  FormText,
} from "reactstrap";
import { isEmailValidate } from "../../helpers";
import {
  addEventAction,
  updateEventAction,
} from "../../redux/actions/eventActions";

const ModalEvent = (props) => {
  const dispatch = useDispatch();

  const { eventData } = useSelector((state) => state.events);

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
  const [isError, setIsError] = useState(false);

  const checkTotalEvent = eventData?.filter(
    (event) =>
      dayjs(event.eventTime).format("YYYY-MM-DD") ===
      dayjs(manipulateDate).format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (props.open) {
      dateChange({ value: manipulateDate, error: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  useEffect(() => {
    if (props?.type === "edit") {
      nameChange({ value: props?.data?.eventName, error: null });
      dateChange({
        value: props?.data?.eventTime,
        error: null,
      });
      guestListChange(props?.data?.eventGuest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.type]);

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

  const onSubmit = () => {
    const data = {
      _id: dayjs().format("YYYYMMDDHHmmss"),
      eventName: name.value,
      eventTime: date.value,
      eventGuest: guestList,
    };

    const dataEdit = {
      _id: props?.data?._id,
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
      if (props.type === "edit") {
        dispatch(updateEventAction(props?.data?._id, dataEdit));

        setTimeout(() => {
          setInitState();
          props.closeDialog();
        }, 150);
      } else {
        if (checkTotalEvent?.length >= 3) {
          setIsError(true);
        } else {
          dispatch(addEventAction(data));

          setTimeout(() => {
            setInitState();
            props.closeDialog();
          }, 150);
        }
      }
    }
  };

  const closeDialog = () => {
    props.closeDialog();
    setInitState();
  };

  return (
    <Modal isOpen={props.open} toggle={closeDialog}>
      <ModalHeader
        className="event-modal-header"
        toggle={closeDialog}
      >{`${props.type} Event`}</ModalHeader>
      <ModalBody className="event-modal-body">
        <Form>
          <Alert
            isOpen={isError}
            color="danger"
            toggle={() => setIsError(false)}
          >
            Sorry, This date's event is full
          </Alert>
          <FormGroup>
            <Label>Event Name</Label>
            <Input
              type="text"
              value={name.value}
              onChange={(e) =>
                nameChange({ value: e.target.value, error: null })
              }
              invalid={name.error}
              placeholder="Input event name"
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
              placeholder="Input email guest"
            />
            <FormText>Note: Press enter to add guest</FormText>
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
      <ModalFooter className="event-modal-footer">
        <Button className="button button-primary" onClick={() => onSubmit()}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalEvent;
