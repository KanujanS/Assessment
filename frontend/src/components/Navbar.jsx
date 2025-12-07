import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dark
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 dark:text-white shadow z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="font-semibold text-2xl">
          Assessment
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-2 px-3 py-1 border rounded-2xl cursor-pointer"
          >
            {dark ? <CiLight className="text-xl" /> : <MdDarkMode className="text-xl" />}{" "}
            {dark ? "Light" : "Dark"}
          </button>

          {!user ? (
            <Link to="/login" className="border px-3 py-1 rounded-xl">
              Login
            </Link>
          ) : (
            <>
              <Link to="/activity" className="hover:underline">
                Activity
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              {user.role === "admin" && (
                <Link to="/admin/users" className="hover:underline">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 dark:text-white w-full px-4 pb-4">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-2 px-3 py-2 border rounded-2xl mb-2 w-full justify-center"
          >
            {dark ? <CiLight className="text-xl" /> : <MdDarkMode className="text-xl" />}{" "}
            {dark ? "Light" : "Dark"}
          </button>

          {!user ? (
            <Link
              to="/login"
              className="block px-3 py-2 border rounded-xl mb-2 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/activity"
                className="block px-3 py-2 rounded mb-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Activity
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded mb-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin/users"
                  className="block px-3 py-2 rounded mb-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="bg-red-500 w-full px-3 py-2 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
      <hr className="hidden md:block" />
    </nav>
  );
};

export default Navbar;