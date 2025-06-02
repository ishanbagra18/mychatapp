import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";





function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full opacity-10 bg-[url('/bg-pattern.svg')] bg-cover"></div>
      </div>

      <div className="relative z-10 bg-[#0a192f]/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Side Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-[#112240] p-4">
          <img
            src="/signup.png" // <-- Update with your image path
            alt="Signup Illustration"
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-1/2 px-10 py-8 text-white space-y-6"
        >
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
              Chat Corner
            </h1>
            <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
              Create an account and jump into the conversation
            </h2>
          </div>

          {/* Fullname */}
          <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
            <input
              type="text"
              placeholder="Fullname"
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <p className="text-red-400 text-sm font-semibold">Fullname is required</p>
          )}

          {/* Email */}
          <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <p className="text-red-400 text-sm font-semibold">Email is required</p>
          )}

          {/* Password */}
          <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <p className="text-red-400 text-sm font-semibold">Password is required</p>
          )}

          {/* Confirm Password */}
          <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm font-semibold">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* Button & Link */}
          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>
              Have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Signup"
              className="bg-gradient-to-r from-black to-blue-600 
                        hover:from-green-500 hover:to-green-700 
                        text-white font-bold py-2 px-5 rounded-xl shadow-md 
                        hover:shadow-lg 
                        transition-all duration-300 ease-in-out 
                        hover:scale-105 hover:-translate-y-1 
                        focus:outline-none focus:ring-4 focus:ring-green-400
                        cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;






































// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useAuth } from "../context/AuthProvider";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// function Signup() {
//   const [authUser, setAuthUser] = useAuth();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const password = watch("password", "");
//   const confirmPassword = watch("confirmPassword", "");

//   const validatePasswordMatch = (value) => {
//     return value === password || "Passwords do not match";
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("fullname", data.fullname);
//     formData.append("email", data.email);
//     formData.append("password", data.password);
//     formData.append("confirmPassword", data.confirmPassword);
//     formData.append("profilePic", data.profilePic[0]);

//     await axios
//       .post("/api/user/signup", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         if (response.data) {
//           toast.success("Signup successful");
//         }
//         localStorage.setItem("ChatApp", JSON.stringify(response.data));
//         setAuthUser(response.data);
//       })
//       .catch((error) => {
//         if (error.response) {
//           toast.error("Error: " + error.response.data.error);
//         }
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden px-4">
//       <div className="relative z-10 bg-[#0a192f]/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
//         {/* Left Side Image */}
//         <div className="w-full md:w-1/2 h-full hidden md:block">
//           <img
//             src="/signup.png"
//             alt="Signup"
//             className="object-cover w-full h-full"
//           />
//         </div>

//         {/* Signup Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 px-10 py-8 text-white space-y-6">
//           <div className="text-center space-y-1">
//             <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
//               ChatApp
//             </h1>
//             <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
//               Create an account and jump into the conversation
//             </h2>
//           </div>

//           {/* Fullname */}
//           <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
//             <input
//               type="text"
//               placeholder="Fullname"
//               className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
//               {...register("fullname", { required: true })}
//             />
//           </label>
//           {errors.fullname && (
//             <p className="text-red-400 text-sm font-semibold">Fullname is required</p>
//           )}

//           {/* Email */}
//           <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
//             <input
//               type="email"
//               placeholder="Email"
//               className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
//               {...register("email", { required: true })}
//             />
//           </label>
//           {errors.email && (
//             <p className="text-red-400 text-sm font-semibold">Email is required</p>
//           )}

//           {/* Password */}
//           <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
//             <input
//               type="password"
//               placeholder="Password"
//               className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
//               {...register("password", { required: true })}
//             />
//           </label>
//           {errors.password && (
//             <p className="text-red-400 text-sm font-semibold">Password is required</p>
//           )}

//           {/* Confirm Password */}
//           <label className="flex items-center gap-2 bg-[#112240] p-3 rounded-md">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="bg-transparent border-none outline-none w-full text-white placeholder-gray-400"
//               {...register("confirmPassword", {
//                 required: true,
//                 validate: validatePasswordMatch,
//               })}
//             />
//           </label>
//           {errors.confirmPassword && (
//             <p className="text-red-400 text-sm font-semibold">
//               {errors.confirmPassword.message}
//             </p>
//           )}

 

//           {/* Button & Link */}
//           <div className="flex justify-between items-center text-sm text-gray-400">
//             <p>
//               Have an account?{" "}
//               <Link to="/login" className="text-blue-400 underline hover:text-blue-300">
//                 Login
//               </Link>
//             </p>
//             <input
//               type="submit"
//               value="Signup"
//               className="bg-gradient-to-r from-black to-blue-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-2 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;
