import React, { useState } from "react";
import dayjs from "dayjs";
import { Button } from "reactstrap";
import Calendar from "../components/Calendar/Calendar";
import ModalEvent from "../components/Modal/Modal";
import ModalDetail from "../components/Modal/ModalDetail";

const CalendarPage = () => {
  const [openDialog, setOpenDialog] = useState({
    open: false,
    data: {},
    type: "",
  });
  const [openDetail, setOpenDetail] = useState({
    open: false,
    data: {},
  });

  const closeModal = () => {
    setOpenDialog({ open: false, data: {}, type: "" });
  };

  const openModal = (value) => {
    console.log("add");
    setOpenDialog({ open: true, data: value.data, type: value.type });
    setOpenDetail({ open: false, data: {} });
  };

  const openModalDetail = (value) => {
    console.log("det");
    setOpenDialog({ open: false, data: {}, type: "" });
    setOpenDetail({ open: true, data: value.data });
  };
  const closeModalDetail = () => {
    setOpenDetail({ open: false, data: {} });
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
        <Calendar
          dialogOpen={(value) => openModal(value)}
          detailOpen={(value) => openModalDetail(value)}
        />
      </div>
      <ModalEvent
        open={openDialog.open}
        data={openDialog.data}
        type={openDialog.type}
        closeDialog={() => closeModal()}
      />
      <ModalDetail
        open={openDetail.open}
        data={openDetail.data}
        closeDialog={() => closeModalDetail()}
        openEdit={(value) => openModal(value)}
      />
    </section>
  );
};

export default CalendarPage;
