import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Background patterns using SVG or your own design */}
        <div className="w-full h-full opacity-10 bg-[url('/bg-pattern.svg')] bg-cover"></div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 bg-[#0a192f]/80 backdrop-blur-lg px-10 py-8 rounded-3xl shadow-2xl w-[350px] text-white"
      >
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          Welcome Back! Let’s Get You Logged In
        </h1>

        <h1 className="text-3xl text-center mb-6 font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Chat Corner
        </h1>

        {/* Email */}
        <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793l6.674 3.217c.206.1.446.1.652 0L15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-400 text-sm font-semibold block mb-2">
            This field is required
          </span>
        )}

        {/* Password */}
        <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-400 text-sm font-semibold block mb-4">
            This field is required
          </span>
        )}

        {/* Text & Button */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <p>
            New user?
            <Link
              to="/signup"
              className="text-blue-400 underline ml-1 hover:text-blue-300"
            >
              Signup
            </Link>
          </p>
          <button
            type="submit"
            className="bg-gradient-to-r from-black to-blue-600 
           hover:from-green-500 hover:to-green-700 
           text-white font-bold py-2 px-5 rounded-xl shadow-md 
           hover:shadow-lg 
           transition-all duration-300 ease-in-out 
           hover:scale-105 hover:-translate-y-1 
           focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
