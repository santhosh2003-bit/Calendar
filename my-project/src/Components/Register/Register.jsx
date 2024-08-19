import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    window.location.href = "/login";
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className=" w-full h-screen bg-[#242424] flex justify-center items-center">
      <div className="shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] px-12 w-[400px] h-[480px] py-8 rounded-xl">
        <h1 className="text-2xl mb-3 text-white font-mono text-center">
          Registration Form{" "}
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="fname"
            className="float-start mb-2 text-white font-mono"
          >
            {" "}
            Name:
          </label>
          <br />
          <input
            type="text"
            id="fname"
            name="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required
          />

          <label
            htmlFor="email"
            className="float-start mb-2 text-white font-mono"
          >
            Email:
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <label
            htmlFor="pwd"
            className="float-start mb-2 text-white font-mono"
          >
            Password:
          </label>
          <br />
          <input
            type="password"
            id="pwd"
            name="pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <br />
          <button
            type="submit"
            className="relative w-full mb-2 inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-lg shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
              Register
            </span>
            <span className="relative invisible">Register</span>
          </button>

          <br />
          <a
            href="/login"
            className="text-white hover:text-white cursor-auto  font-mono"
          >
            Already have an account?{" "}
            <span className="text-blue-600 cursor-pointer  font-mono">
              Login 🚩
            </span>
          </a>
          <br />
          <a href="#" className="text-blue-600  font-mono">
            Terms & Conditions
          </a>
          <br />
          <a href="#" className="text-blue-600  font-mono">
            Privacy Policy
          </a>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Register;
