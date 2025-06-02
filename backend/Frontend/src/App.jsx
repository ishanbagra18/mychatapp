import React, { useState } from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { Menu } from "lucide-react"; // optional: use any icon you prefer
import Chatbot from "./components/Chatbot"; // Import the Chatbot component
function App() {
  const [authUser] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex min-h-screen relative">
                {/* Mobile Menu Toggle Button */}
                <button
                  className="absolute top-4 left-4 z-20 md:hidden bg-white p-2 rounded shadow"
                  onClick={toggleSidebar}
                >
                  <Menu className="h-6 w-6 text-black" />
                </button>

                {/* Sidebar */}
                <div
                  className={`fixed z-10 top-0 left-0 h-full w-[70%] sm:w-[60%] bg-black text-white p-4 transform transition-transform duration-300 md:static md:translate-x-0 md:w-[30%] ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <Left />
                </div>

                {/* Overlay when sidebar is open on mobile */}
                {sidebarOpen && (
                  <div
                    className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
                    onClick={toggleSidebar}
                  ></div>
                )}

                {/* Right Side */}
                <div className="flex-1 ml-0 md:ml-0 w-full md:w-[70%]">
                  <Right />
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />


        <Route path="/chatbot" element={authUser  ? <Chatbot /> : <Navigate to="/login" />} /> {/* New route for Chatbot */}



      </Routes>





      <Toaster />
    </>
  );
}

export default App;
