import React from 'react';
import { Logout } from './Logout';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-lg">Book Your Seat</div>
      <Logout />
    </nav>
  );
};

