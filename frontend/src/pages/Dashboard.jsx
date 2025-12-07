import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:text-white p-6">
      <h1 className="text-3xl mb-5">Dashboard</h1>

      <div>
        <div className="flex gap-4 items-center">
          {user?.profilePicture ? (
            <img
              src={`http://localhost:4000${user.profilePicture}`}
              className="w-20 h-20 rounded-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-400 rounded-full" />
          )}

          <div>
            <p className="text-xl font-semibold">Name: {user?.name}</p>
            <p className="text-gray-500">Email: {user?.email}</p>
            <p className="text-sm">Role: {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;