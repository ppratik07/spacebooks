import React, { useEffect, useState } from "react";
import BookingModalForm from "./BookingModalForm";

const SideNavigation: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (activeMenu === "Office Map") {

      const script = document.createElement("script");
      script.src = "https://interactive-img.com/js/include.js";
      script.async = true;
      document.body.appendChild(script);

      // Cleanup script when unmounting
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>
        <nav className="flex flex-col gap-4 mt-4">
          <div
            className="flex items-center gap-4 p-3 hover:bg-blue-600 cursor-pointer"
            onClick={() => setActiveMenu("Office Map")}
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
            <span>Office Map</span>
          </div>
        </nav>
      </div>
      <div className="flex-1 bg-gray-100 p-4">
        {activeMenu === "Office Map" && (
          <div>
            <div className="iactiveImg" data-ii="62712"></div>
          </div>
        )}
        <BookingModalForm />
      </div>
    </div>
  );
};

export default SideNavigation;
