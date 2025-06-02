import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="w-full h-screen bg-black text-gray-300 flex flex-col">
      <div className="h-[10vh]">
        <Search />
      </div>

      {/* Scrollable Users list */}
      <div className="flex-1 overflow-y-auto">
        <Users />
      </div>

      {/* Fixed Logout section */}
      <div className="h-auto">
        <Logout />
      </div>
    </div>
  );
}

export default Left;
