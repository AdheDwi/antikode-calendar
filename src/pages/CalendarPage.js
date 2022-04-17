import React, { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import ModalEvent from "../components/Modal/Modal";

const CalendarPage = () => {
  const [openDialog, setOpenDialog] = useState({
    open: false,
    data: null,
    type: "",
  });

  const closeModal = () => {
    setOpenDialog({ open: false, data: null, type: "" });
  };

  const openModal = (value) => {
    setOpenDialog({ open: true, data: value.data, type: value.type });
    console.log("openDialog", openDialog);
  };

  return (
    <section className="page-wrapper">
      <div className="title-page">Antikode Event Calendar</div>
      <Calendar dialogOpen={(value) => openModal(value)} />
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
