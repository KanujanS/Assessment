import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider, { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-xl font-semibold">
            FAITE Admin
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/activity" className="px-3 py-1 rounded hover:bg-gray-100">Activity</Link>
              <Link to="/profile" className="px-3 py-1 rounded hover:bg-gray-100">Profile</Link>
              {user.role === "admin" && (
                <Link to="/admin/users" className="px-3 py-1 rounded hover:bg-gray-100">Admin</Link>
              )}
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded hover:bg-gray-100">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;