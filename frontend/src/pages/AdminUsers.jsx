import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { MdDelete } from "react-icons/md";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const load = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await API.delete(`/admin/users/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:text-white pt-24 flex justify-center">
      <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow w-full max-w-4xl">

        <h2 className="text-2xl mb-4 font-semibold">Users List</h2>

        {/* 🚀 Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Role</th>
                <th className="py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="py-2">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>

                  <td className="py-2">

                    {/* Desktop Button */}
                    <button
                      onClick={() => remove(u._id)}
                      className="hidden sm:inline bg-red-600 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>

                    {/* Mobile Icon */}
                    <button
                      onClick={() => remove(u._id)}
                      className="sm:hidden text-red-600 text-2xl"
                    >
                      <MdDelete />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminUsers;