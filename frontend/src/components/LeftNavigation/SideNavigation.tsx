import React, { useEffect, useState } from "react";
import BookingModalForm from "./BookingModalForm";
import { MyBookings } from "./MyBookings";
import { BookingProvider } from "../Context/BookingContext";
import { Profile } from "../../pages/Profile";
import { MyCalenderView } from "./MyCalenderView";
import { DarkModeToggle } from "../ui/DarkModeToggle";

const SideNavigation: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  //Hitting API to get the map
  useEffect(() => {
    if (activeMenu === "Office Map") {
      const script = document.createElement("script");
      script.src = "https://interactive-img.com/js/include.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [activeMenu]);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="p-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>

        {/* Navigation Items */}
        <div className="flex-1">
          <nav className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4 p-3 hover:bg-blue-600 cursor-pointer" onClick={() => setActiveMenu("Office Map")}>
              <span>📍</span> <span>Office Map</span>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-blue-600 cursor-pointer" onClick={() => setActiveMenu("My Bookings")}>
              <span>📅</span> <span>My Bookings</span>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-blue-600 cursor-pointer" onClick={() => setActiveMenu("My Calender")}>
              <span>📆</span> <span>My Calender</span>
            </div>
          </nav>
        </div>

        {/* My Profile (Pinned to Bottom) */}
        <Profile />
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-4">
        {activeMenu === "Office Map" && <div className="iactiveImg" data-ii="62712"></div>}
        <BookingProvider>
          {activeMenu === "My Bookings" && <MyBookings />}
          <BookingModalForm />
        </BookingProvider>
        {activeMenu === "My Calender" && <MyCalenderView />}
        {activeMenu === "My Profile" && <Profile />}
        <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-4">
          <DarkModeToggle/>
          <h1 className="text-2xl font-bold">Hello, Dark Mode!</h1>
        </div>

      </div>
    </div>
  );
};

export default SideNavigation;
