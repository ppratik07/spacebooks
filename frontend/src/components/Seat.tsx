import React from 'react';


const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  const statusClasses = {
    available: 'bg-green-500',
    reserved: 'bg-yellow-500',
    unavailable: 'bg-red-500',
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center text-white cursor-pointer ${statusClasses[seat.status]}`}
      onClick={onClick}
    >
      {seat.label}
    </div>
  );
};

export default Seat;
