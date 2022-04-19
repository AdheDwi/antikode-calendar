import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Button } from "reactstrap";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const Calendar = (props) => {
  const { eventData } = useSelector((state) => state.events);
  console.log("eventData", eventData);

  const today = dayjs().format("YYYY-MM-DD");
  const thisYear = dayjs().format("YYYY");
  const thisMonth = dayjs().format("M");
  let currentMonthDays;
  let previousMonthDays;
  let nextMonthDays;

  const [dateState, setDateState] = useState({
    year: thisYear,
    month: thisMonth,
  });
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let selectedMonth = dayjs(new Date(dateState.year, dateState.month - 1, 1));

  const getNumberOfDaysInMonth = (year, month) => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  };

  // Fungsi Untuk Mengambil Tanggal dibulan Berjalan
  const getDaysCurrentMonth = (year, month) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
      };
    });
  };

  // Fungsi Untuk Mengambil Tanggal dibulan Sebelumnya
  const getDaysPreviousMonth = (year, month) => {
    const firstDayOnMonth = getWeekday(currentMonthDays[0].date);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
    const numberOfDaysPreviousMonth = firstDayOnMonth ? firstDayOnMonth - 1 : 6;
    const previousMonthLastMonday = dayjs(currentMonthDays[0]?.date)
      .subtract(numberOfDaysPreviousMonth, "day")
      .date();

    return [...Array(numberOfDaysPreviousMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMonday + index
          }`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMonday + index,
        isCurrentMonth: false,
      };
    });
  };

  // Fungsi Untuk Mengambil Tanggal dibulan Selanjutnya
  const getDaysNextMonth = (year, month) => {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
    const numberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;

    return [...Array(numberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
      };
    });
  };

  const getWeekday = (date) => {
    return dayjs(date).weekday();
  };

  // Render List di Kalender
  const generateDates = (year = dateState.year, month = dateState.month) => {
    currentMonthDays = getDaysCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    );
    previousMonthDays = getDaysPreviousMonth(year, month);
    nextMonthDays = getDaysNextMonth(year, month);

    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    return days?.map((day) => {
      let style = "white";
      if (!day?.isCurrentMonth) {
        style = "grey";
      } else if (day?.date === today) {
        style = "cyan";
      }

      const eventOnDate = eventData
        ?.filter(
          (event) => dayjs(event?.eventTime).format("YYYY-MM-DD") === day?.date
        )
        .sort(
          (a, b) =>
            (new Date(a?.eventTime).getTime() || -Infinity) -
            (new Date(b?.eventTime).getTime() || -Infinity)
        );

      const data = {
        ...day,
        event: eventOnDate,
      };

      return (
        <li key={day?.date} className={style}>
          <div
            className="date-wrap"
            onClick={() => props?.dialogOpen({ data: data, type: "add" })}
          >
            <div className="date">{day?.dayOfMonth}</div>
          </div>
          {eventOnDate?.length > 0 &&
            eventOnDate?.map((event, key) => {
              let colorEvent = "orange";
              if (key === 0) {
                colorEvent = "green";
              } else if (key === 1) {
                colorEvent = "yellow";
              }
              return (
                <div
                  className={`event ${colorEvent}`}
                  key={event?._id}
                  onClick={
                    () =>
                      props.detailOpen({
                        data: { ...event, color: colorEvent },
                      })
                    // console.log({ data: { ...event, color: colorEvent } })
                  }
                >
                  <p>{`${dayjs(event?.eventTime).format("HH:mm")} - ${
                    event?.eventName
                  }`}</p>
                </div>
              );
            })}
        </li>
      );
    });
  };

  // Fungsi Untuk Mengubah Bulan
  const onChangeMonth = (value) => {
    selectedMonth = value;
    setDateState({
      year: selectedMonth.format("YYYY"),
      month: selectedMonth.format("M"),
    });
  };

  return (
    <div className="calendar-wrapper">
      <div className="calender-title">
        <div className="calendar-month">{`${dayjs(dateState.month).format(
          "MMMM"
        )} ${dateState.year}`}</div>
        <div className="calendar-trigger">
          <div className="button-flex">
            <Button
              className="button button-primary"
              onClick={() =>
                onChangeMonth(dayjs(selectedMonth).subtract(1, "month"))
              }
            >
              Prev
            </Button>
            <Button
              className="button button-primary bordered"
              onClick={() =>
                onChangeMonth(dayjs(new Date(thisYear, thisMonth - 1, 1)))
              }
            >
              Today
            </Button>
            <Button
              className="button button-primary"
              onClick={() =>
                onChangeMonth(dayjs(selectedMonth).add(1, "month"))
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <ul className="calendar-header">
        {weekdays?.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
      <ul className="calendar-body">{generateDates()}</ul>
    </div>
  );
};

export default Calendar;
