import React, { useState } from "react";
import dayjs from "dayjs";
import { Button } from "reactstrap";
import Calendar from "../components/Calendar/Calendar";
import ModalEvent from "../components/Modal/Modal";

const CalendarPage = () => {
  const [openDialog, setOpenDialog] = useState({
    open: false,
    data: {},
    type: "",
  });

  const closeModal = () => {
    setOpenDialog({ open: false, data: {}, type: "" });
  };

  const openModal = (value) => {
    setOpenDialog({ open: true, data: value.data, type: value.type });
  };

  return (
    <section className="page-wrapper">
      <div className="fixed-header">
        <div className="container">
          <div className="header-content">
            <div className="title-page">Event Calendar</div>
            <Button
              className="button button-add"
              onClick={() =>
                openModal({
                  data: { date: dayjs().format("YYYY-MM-DD") },
                  type: "add",
                })
              }
            >
              Add Event
            </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <Calendar dialogOpen={(value) => openModal(value)} />
      </div>
      <ModalEvent
        open={openDialog.open}
        data={openDialog.data}
        type={openDialog.type}
        closeDialog={() => closeModal()}
      />
    </section>
  );
};

export default CalendarPage;
