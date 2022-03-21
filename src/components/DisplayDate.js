import React, { useState } from "react";

const DisplayDate = (props) => {
  let current = new Date();
  const [day, setDay] = useState(current.getDay());
  let yearNow = `${current.getFullYear()}`;
  const [month, setMonth] = useState(`0${current.getMonth() + 1}`);
  let dayNow = `${current.getDate()}`;

  const convertDay = (day) => {
    if (day == 0) setDay("Sunday");
    else if (day == 1) setDay("Monday");
    else if (day == 2) setDay("Tueday");
    else if (day == 3) setDay("Wednesday");
    else if (day == 4) setDay("Thursday");
    else if (day == 5) setDay("Friday");
    else if (day == 6) setDay("Saturday");
    return <> {day} </>;
  };

  const convertMonth = (month) => {
    if (month === "01") setMonth("January");
    else if (month === "02") setMonth("February");
    else if (month === "03") setMonth("March");
    else if (month === "04") setMonth("April");
    else if (month === "05") setMonth("May");
    else if (month === "06") setMonth("June");
    else if (month === "07") setMonth("July");
    else if (month === "08") setMonth("August");
    else if (month === "09") setMonth("September");
    else if (month === "10") setMonth("October");
    else if (month === "11") setMonth("November");
    else if (month === "12") setMonth("December");
    return <>{month}</>
  };

  return (
    <>
      <div className="display-date">
        {convertDay(day)}
        <h1> {convertMonth(month)} {dayNow}, {yearNow} </h1>
      </div>
    </>
  );
};

export default DisplayDate;
