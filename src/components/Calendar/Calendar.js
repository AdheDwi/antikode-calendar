import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ButtonGroup, Button } from "reactstrap";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const Calendar = (props) => {
  const today = dayjs().format("YYYY-MM-DD");
  const thisYear = dayjs().format("YYYY");
  const thisMonth = dayjs().format("M");
  let currentMonthDays;
  let previousMonthDays;
  let nextMonthDays;

  const [dateState, setDateState] = useState({year: thisYear, month: thisMonth})


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

  const getDaysCurrentMonth = (year, month) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
      };
    });
  };

  const getDaysPreviousMonth = (year, month) => {
    const firstDayOnMonth = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const numberOfDaysPreviousMonth = firstDayOnMonth ? firstDayOnMonth - 1 : 6;

    const previousMonthLastMonday = dayjs(currentMonthDays[0].date)
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

      return (
        <li
          key={day?.date}
          onClick={() => props?.dialogOpen({ data: day, type: "edit" })}
          className={style}
        >
          <div className="date">{day?.dayOfMonth}</div>
        </li>
      );
    });
  };

  const onChangeMonth = (value) => {
    selectedMonth = value;
    setDateState({year: selectedMonth.format("YYYY"), month: selectedMonth.format("M")});
  };

  return (
    <div className="calendar-wrapper">
      <div className="calender-title">
        <div className="calendar-month">April 2022</div>
        <div className="calendar-trigger">
          <ButtonGroup>
            <Button
              onClick={() =>
                onChangeMonth(dayjs(selectedMonth).subtract(1, "month"))
              }
            >
              Prev
            </Button>
            <Button
              onClick={() =>
                onChangeMonth(dayjs(new Date(thisYear, thisMonth - 1, 1)))
              }
            >
              Today
            </Button>
            <Button
              onClick={() =>
                onChangeMonth(dayjs(selectedMonth).add(1, "month"))
              }
            >
              Next
            </Button>
          </ButtonGroup>
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
