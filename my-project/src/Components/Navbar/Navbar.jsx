import React from "react";
import ScheduleIcon from "@mui/icons-material/Schedule";
const Navbar = () => {
  const token = localStorage.getItem("token");

  const handleNavbar = () => {
    if (token) {
      return (
        <ul className="flex gap-4 text-white items-center ">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="relative inline-block px-4 py-2 font-medium group"
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-2xl"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black rounded-2xl"></span>
            <span className="relative text-black group-hover:text-white ">
              Log Out
            </span>
          </button>
        </ul>
      );
    } else {
      return (
        <ul className="flex gap-4 text-white items-center ">
          <li
            className="underLine_animate hidden sm:block"
            onClick={() => (window.location.href = "/register")}
          >
            Sign In
          </li>
          <li
            className="underLine_animate hidden sm:block"
            onClick={() => (window.location.href = "/login")}
          >
            Sign Up
          </li>
        </ul>
      );
    }
  };
  return (
    <div>
      <nav className="flex justify-around items-center p-3">
        <div className="flex gap-1 items-center">
          <ScheduleIcon style={{ color: "white" }} />
          <h1 className="text-stone-200 font-[Poppins, sans-serif] text-2xl ">
            Schedule
          </h1>
        </div>
        {handleNavbar()}
      </nav>
    </div>
  );
};

export default Navbar;
