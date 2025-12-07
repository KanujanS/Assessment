import React, { useEffect, useState } from "react";
import API from "../api/axios";

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
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">Admin - Users</h2>

      <table className="w-full">
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
              <td>
                <button
                  onClick={() => remove(u._id)}
                  className="bg-red-600 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default AdminUsers;