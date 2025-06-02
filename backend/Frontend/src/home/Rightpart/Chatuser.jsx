

// import React from "react";
// import useConversation from "../../zustand/useConversation.js";
// import { useSocketContext } from "../../context/SocketContext.jsx";
// import { CiMenuFries } from "react-icons/ci";
// import axios from "axios";

// function Chatuser() {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();

//   const getOnlineUsersStatus = (userId) => {
//     return onlineUsers.includes(userId) ? "Online" : "Offline";
//   };




  

// const handleDeleteConversation = async (conversationId) => {
//   try {
//     const chatAppData = localStorage.getItem("ChatApp");

//     if (!chatAppData) {
//       throw new Error("Token not found");
//     }

//     const { token } = JSON.parse(chatAppData);

//     if (!token) {
//       throw new Error("Token not found");
//     }

//     const response = await axios.delete(`/api/message/delete/${conversationId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     toast.success("Conversation deleted");
//     console.log("Deleted conversation:", response.data);

//     // Optionally refresh UI or conversations list here

//   } catch (error) {
//     console.error("Delete conversation error:", error);
//     if (error.response?.data?.error) {
//       toast.error("Error: " + error.response.data.error);
//     } else {
//       toast.error("Failed to delete conversation: " + error.message);
//     }
//   }
// };



//   return (
//     <div className="relative flex h-[8%] gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
//       <label
//         htmlFor="my-drawer-2"
//         className="btn btn-ghost drawer-button lg:hidden absolute left-5"
//       >
//         <CiMenuFries className="text-white text-xl" />
//       </label>

//       <div className="flex space-x-3 items-center justify-center h-[8vh] hover:bg-gray-700 duration-300 ml-10">
//         <div className="avatar online">
//           <div className="w-16 rounded-full">
//             <img src="/myfav.jpg" />
//           </div>
//         </div>
//         <div>
//           <h1 className="text-xl text-white">{selectedConversation.fullname}</h1>
//           <span className="text-sm text-gray-300">
//             {getOnlineUsersStatus(selectedConversation._id)}
//           </span>
//         </div>

//         {/* Delete Button */}
//         <button
//           onClick={handleDeleteConversation}
//           className="text-sm text-red-400 hover:text-red-600 px-3 py-1 border border-red-500 rounded-md ml-4"
//         >
//           Delete Chat
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chatuser;






import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

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
  src={selectedConversation.profilePic || "/defaultProfilePic.jpg"}
  alt="Profile"
  onError={(e) => {
    e.target.onerror = null; // prevent infinite loop if default also fails
    e.target.src = "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
  }}
/>
 {/* Use the profile picture */}
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
