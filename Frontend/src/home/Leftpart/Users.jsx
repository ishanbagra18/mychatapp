import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div className="flex flex-col px-2 sm:px-4">
      <h1 className="py-2 text-white font-semibold bg-slate-800 rounded-md text-sm sm:text-base text-center">
        All Users
      </h1>

      <div className="mt-2 space-y-1">
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
