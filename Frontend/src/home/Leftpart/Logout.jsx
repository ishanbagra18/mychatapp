import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  const handleChatWithAI = () => {
    toast("Starting chat with AI...");
    navigate("/Chatbot");
  };

  return (
    <>
      <hr />
      <div className="h-auto bg-transparent flex flex-col sm:flex-row items-center justify-center gap-4 px-4 py-6">
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`w-full sm:w-auto text-center ${
            loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300 ease-in-out`}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>

        <button
          onClick={handleChatWithAI}
          className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300 ease-in-out"
        >
          Chat with AURA
        </button>
      </div>
    </>
  );
}

export default Logout;
