import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Activity = () => {
  const [logs, setLogs] = useState([]);

  const load = async () => {
    const res = await API.get("/activity");
    setLogs(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Activity Logs</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Event</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-b">
              <td className="py-2">{new Date(log.createdAt).toLocaleString()}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activity;