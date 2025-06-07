import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex h-[8%] gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden absolute left-5">
        <CiMenuFries className="text-white text-xl" />
      </label>
      <div className="flex space-x-3 items-center justify-center h-[8vh] hover:bg-gray-700 duration-300 ml-10">
        <div className="avatar online">
          <div className="w-16 rounded-full">
            <img
  src="https://static.vecteezy.com/system/resources/previews/022/123/337/original/user-icon-profile-icon-account-icon-login-sign-line-vector.jpg"
  alt="Profile"
/>

          </div>  
        </div>
        <div>
          <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
          <span className="text-sm text-gray-300">{getOnlineUsersStatus(selectedConversation._id)}</span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;