import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ScheduleImage from "../assets/ScheduleImage.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import eventsImage from "../assets/events.png";
import noEvents from "../assets/noEvents.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [handleEdit, setHandleEdit] = useState(false);
  const [id, setId] = useState("");
  // console.log(updateSchedule);
  useEffect(() => {
    fetch("https://calendar-react-app.onrender.com/events-list", {
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
          navigate("/login");
        } else {
          setSchedules(data.events);
        }
      });
  }, []);

  //handle Delete a Event
  const handleDeleteEvent = (id) => {
    // console.log("delete id", id);
    fetch("https://calendar-react-app.onrender.com/event-delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Please Login " + data.error);
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert(data.message);
          window.location.reload();
        }
      });
  };

  //get an even for Update
  const handleEditionForGetEvent = (id) => {
    fetch(`https://calendar-react-app.onrender.com/event-find/${id}`, {
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
          navigate("/login");
        } else {
          setDate(data.event.date);
          setTime(data.event.time);
          setEvent(data.event.description);
          setId(id);
        }
      });
  };
  //handle updated event submit
  const handleSubmitUpdateEvent = async (e) => {
    console.log(id);
    e.preventDefault();
    try {
      fetch("https://calendar-react-app.onrender.com/event-update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: id,
          date: date,
          time: time,
          description: event,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert("Please Login " + data.error);
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            alert(data.message);
            setHandleEdit(false);
            window.location.reload();
          }
        });
    } catch (error) {
      console.error("Error updating event", error);
    }
  };
  return (
    <div className="w-full h-full bg-[#242424] ">
      <Navbar />
      <div className="pl-[10%] pt-[12%] flex flex-col md:flex-row">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl text-white tracking-wide">
            <i className="text-5xl text-yellow-300 font-extrabold">W</i>elCome
            To your Daily Schedule
          </h1>
          <p className="text-gray-500">
            "The key is not to prioritize what's on your schedule, but to
            schedule your priorities." –{" "}
            <span className="underline text-green-400">Stephen Covey</span>
          </p>
        </div>
        <div>
          <img
            src={ScheduleImage}
            alt="ScheduleImage"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-around items-center mx-auto mb-2">
          <h1 className="md:text-2xl text-xl font-semibold text-white">
            Your's Schedules
          </h1>
          <button
            onClick={() => {
              window.location.href = "/calender";
            }}
            className="relative w-[100px] md:w-[300px] inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-extrabold text-white backdrop-blur-3xl tracking-widest">
              New
            </span>
          </button>
        </div>
        <hr />
        {schedules.length > 0 ? (
          <div className="flex md:flex-row flex-col justify-between items-center md:pl-7 md:pr-7 pt-5 ">
            <img
              src={eventsImage}
              alt="eventsImage"
              style={{ width: "500px" }}
            />
            <div className="w-full sm:w-fit p-3 md:p-0">
              {schedules.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="text-white mb-3 bg-[#7e22ce] p-3 rounded-lg w-full md:w-[600px]"
                  >
                    <div>
                      <h2 className="font-bold text-xl">{data.date}</h2>
                      <h3 className="text-[#c4b5fd]">{data.time} ⏳ </h3>
                      <p className="text-[#fcd34d]">{data.description} 💬</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <EditIcon
                        className="cursor-pointer"
                        onClick={() => {
                          handleEditionForGetEvent(data._id),
                            setHandleEdit(true);
                        }}
                      />
                      <DeleteIcon
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteEvent(data._id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col justify-between items-center md:pl-7 md:pr-7 pt-5 pb-5">
            <img
              src={noEvents}
              alt="noEvents"
              className="rounded-2xl md:w-[500px] w-[300px]"
            />

            <p className="text-center text-white text-lg ">
              No Schedule Found Please New Events Add Here
            </p>
          </div>
        )}
        {handleEdit && (
          <div className="text-white absolute bg-[#242424] w-full md:w-96 top-[100%] left-[50%] translate-x-[-50%] translate-y-[50%] p-3 rounded-lg">
            <h1 className="text-white ">
              Schedule for {date ? date : "Loading"}{" "}
            </h1>
            <br />
            <hr />
            <form
              className="flex flex-col px-4 "
              onSubmit={handleSubmitUpdateEvent}
            >
              <label className="text-start mb-1 mt-2">Meeting Date:</label>
              <div className="bg-gray-50 border text-start  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                {date ? date : "Loading"}
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
                value={event ? event : "Loading"}
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
                    setHandleEdit(false);
                  }}
                  className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-green-700 focus:outline-none mt-5"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
