import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-gray-800 dark:text-white flex justify-center items-center">
      <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow w-full max-w-xl">
        <h1 className="text-3xl mb-6 text-center font-bold">Dashboard</h1>

        <div className="flex gap-4 items-center justify-center">
          {user?.profilePicture ? (
            <img
              src={`http://localhost:4000${user.profilePicture}`}
              className="w-30 h-30 md:w-50 md:h-50 rounded-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-400 rounded-full" />
          )}

          <div className="space-y-2">
            <p className="text-xl font-semibold">Name : {user?.name}</p>
            <p className="text-gray-500">Email : {user?.email}</p>
            <p className="text-sm">Role : {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;