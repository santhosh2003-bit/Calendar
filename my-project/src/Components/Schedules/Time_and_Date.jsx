import React from "react";
import dayjs from "dayjs";
export const generate_Date = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");
  // console.log(firstDateOfMonth);
  // console.log(lastDateOfMonth);
  const arrayOfDates = [];

  //create prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayOfDates.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
  }

  // generate dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDates.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  // create suffix dates
  const remainingDates = 42 - arrayOfDates.length;
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remainingDates;
    i++
  ) {
    arrayOfDates.push({ currentMonth: false, date: lastDateOfMonth.date(i) });
  }
  return arrayOfDates;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
