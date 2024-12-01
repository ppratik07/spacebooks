import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">

      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-blue-800 text-white transition-width duration-300 flex flex-col`}
      >

        <div className="p-4 cursor-pointer" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>


        <nav className="flex flex-col gap-4 mt-4">
          <Link
            to="/office-map"
            className="flex items-center gap-4 p-3 hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h11M9 21V3m8 7h3M13 21V3m4 14h4"
              />
            </svg>
            {isOpen && <span>Office Map</span>}
          </Link>


          <div className="flex items-center gap-4 p-3 hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354l1.856 5.472h5.798L15.81 13.07l1.845 5.473L12 15.476 8.346 18.543 10.19 13.07 5.346 9.826h5.798L12 4.354z"
              />
            </svg>
            {isOpen && <span>Settings</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4">
        <h1 className="text-xl font-semibold">Welcome to the Dashboard</h1>
        {/* Replace this with the content rendered for each route */}
      </div>
    </div>
  );
};

export default SidebarMenu;
