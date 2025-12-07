import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 dark:text-white shadow-inner">
      <div className="mx-auto px-4 py-6 flex md:flex-row justify-center items-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Kanujan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;