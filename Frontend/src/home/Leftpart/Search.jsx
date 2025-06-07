import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] w-full">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 sm:gap-3">
            <label className="flex items-center gap-2 w-full border border-gray-700 bg-slate-900 rounded-lg px-3 py-2 sm:py-3">
              <input
                type="text"
                className="flex-grow outline-none bg-transparent text-sm sm:text-base"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="p-2 sm:p-3 rounded-full hover:bg-gray-600 duration-300"
            >
              <FaSearch className="text-xl sm:text-2xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
