import React, { useEffect, useState } from "react";
import { generate_Date, months } from "./Time_and_Date";
import cn from "./cn";
import dayjs from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const Calender = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [select, setSelect] = useState(currentDate);
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [eventList, setEventList] = useState([]);
  //mouse Events Performed Variables
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/events-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Please Login " + data.error);
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setEventList(data.events);
        }
      });
  }, []);
  // let date = "Sun Aug 31 2024";
  // const handleDateEventToMaich = eventList.some((event) => event.date === date);
  // console.log(handleDateEventToMaich);

  // console.log(select.toDate().toDateString());
  // const retundata = generate_Date();
  // console.log(retundata[0].date.toDate().toDateString() === "Sun Jul 28 2024");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!select.toDate().toDateString()) {
      return alert("Please select a date");
    }
    if (!time || !event) {
      return alert("Please enter time and event");
    }
    fetch("http://localhost:5000/events-add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: JSON.stringify({
        date: select.toDate().toDateString(),
        time: time,
        description: event,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Please Login " + data.error);
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          alert(data.message);
        }
      });
  };

  //here the functions for handle hover a date and display event if it has other wise display the No Event Message to user

  const handleMouseEnter = (date) => {
    const event = eventList.find(
      (event) =>
        dayjs(event.date).format("ddd MMM DD YYYY") ===
        date.format("ddd MMM DD YYYY")
    );
    setHoveredDate(date);
    setHoveredEvent(event || null);
  };

  //handle mouse leave the date
  const handleMouseLeave = () => {
    setHoveredDate(null);
    setHoveredEvent(null);
  };

  return (
    <div className="bg-[#242424] h-screen flex justify-center items-center ">
      <div className="flex md:flex-row flex-col md:divide-x-2 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ">
        <div className="w-96 h-100  px-3 py-3 pt-10 md:pt-3  text-white rounded-md">
          <div className="flex justify-between items-center">
            <h1>
              {months[today.month()]} , {today.year()}
            </h1>
            <div className="flex gap-1 items-center">
              <ChevronLeftIcon
                className="cursor-pointer"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1 className="cursor-pointer">Today</h1>
              <ChevronRightIcon
                className="cursor-pointer"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 w-full">
            {days.map((day, index) => {
              return (
                <h1 key={index} className="h-14 grid place-content-center">
                  {day}
                </h1>
              );
            })}
          </div>
          <div className="grid grid-cols-7 w-full ">
            {generate_Date(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                const formatDate = date.format("ddd MMM DD YYYY");
                return (
                  <div
                    key={index}
                    className="h-14 border-t border-gray-400 place-content-center"
                    onMouseEnter={() => {
                      handleMouseEnter(date);
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today ? "bg-red-600 text-white" : "",
                        select.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black, text-white"
                          : "",
                        eventList.some(
                          (event) =>
                            dayjs(event.date).format("ddd MMM DD YYYY") ===
                            formatDate
                        )
                          ? "content-none  bg-green-500 "
                          : "",
                        "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white cursor-pointer"
                      )}
                      onClick={() => {
                        setSelect(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                    {/* Here I am Adding popover or one box to shows the event to use when user hover the specific date */}
                    {hoveredDate &&
                      hoveredDate.format("ddd MMM DD YYYY") === formatDate && (
                        <div className="absolute md:top-[20%] md:left-[28%] bg-gray-800 text-white p-2 rounded shadow-lg w-40 top-[2%] left-[28%]">
                          {hoveredEvent ? (
                            <>
                              <p className="font-bold">{hoveredEvent.date}</p>
                              <p className="text-sm">
                                {hoveredEvent.description}
                              </p>
                              <p className="text-sm">{hoveredEvent.time}</p>
                            </>
                          ) : (
                            <p className="text-gray-300">No events</p>
                          )}
                        </div>
                      )}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="w-96 h-[415px] bg-[#242424] px-2 py-2 text-white text-center rounded-md overflow-scroll hide_the_scrollbar ">
          <h1 className="">Schedule for {select.toDate().toDateString()} </h1>
          <br />
          <hr />
          <form className="flex flex-col px-4 " onSubmit={handleSubmit}>
            <label className="text-start mb-1 mt-2">Meeting Date:</label>
            <div className="bg-gray-50 border text-start  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
              {select.toDate().toDateString()}
            </div>
            <label htmlFor="time" className="text-start mb-1 mt-2">
              Meeting Time:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
            />
            <label htmlFor="topic" className="text-start mb-1 mt-2">
              Meeting Topic:
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              required
              placeholder="Enter Event Here"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none resize-none "
            ></textarea>
            <div className="flex gap-x-5 mb-5 md:mb-0">
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none mt-5">
                Save
              </button>
              <input
                type="button"
                value="Back"
                onClick={() => {
                  window.location.href = "/";
                }}
                className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-green-700 focus:outline-none mt-5"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Calender;
