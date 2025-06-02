import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 px-4 sm:px-6 md:px-8 py-3 cursor-pointer transition duration-300">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 sm:w-12 md:w-14 rounded-full">
            <img
              src={
                user.profilePic
                  ? `http://localhost:5002/${user.profilePic.replace(/\\/g, "/")}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
              }}
            />
          </div>
        </div>
        <div className="text-sm sm:text-base">
          <h1 className="font-semibold sm:font-bold truncate max-w-[160px] sm:max-w-xs">
            {user.fullname}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default User;
