// src/components/SeatLayout.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatLayout: React.FC = () => {
  const [seats, setSeats] = useState(Array(6).fill(Array(8).fill('available')));
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(10); // Assume default ticket price is 10
  const [selectedDate, setSelectedDate] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchSeats = async () => {
      if (selectedDate) {
        try {
          const response = await axios.get(`/api/seats?date=${selectedDate}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSeats(response.data);
        } catch (error) {
          console.error('Error fetching seats', error);
        }
      } else {
        setSeats(Array(6).fill(Array(8).fill('available')));
        setSelectedSeatsCount(0);
      }
    };

    fetchSeats();
  }, [selectedDate, token]);

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    setSeats(prevSeats => {
      const updatedSeats = prevSeats.map((row, rIndex) =>
        row.map((seat, sIndex) => {
          if (rIndex === rowIndex && sIndex === seatIndex) {
            if (seat === 'available') {
              reserveSeat(rowIndex, seatIndex);
              return 'reserved';
            } else if (seat === 'reserved') {
              return 'available';
            }
          }
          return seat;
        })
      );
      updateSelectedCount(updatedSeats);
      return updatedSeats;
    });
  };

  const reserveSeat = async (rowIndex: number, seatIndex: number) => {
    const seatId = rowIndex * seats[0].length + seatIndex; // Calculate seat ID
    try {
      await axios.post(
        '/api/reserve',
        { seatId, date: selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Seat reserved successfully');
    } catch (error) {
      console.error('Error reserving seat', error);
    }
  };

  const updateSelectedCount = (updatedSeats: string[][]) => {
    const selectedSeatsCount = updatedSeats.flat().filter(seat => seat === 'reserved').length;
    setSelectedSeatsCount(selectedSeatsCount);
  };

  const handleMovieSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketPrice(+e.target.value);
    updateSelectedCount(seats);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSeats(Array(6).fill(Array(8).fill('available')));
    setSelectedSeatsCount(0);
  };

  return (
    <div className="movie-container flex flex-col items-center justify-center text-white">
      <ul className="showcase flex justify-between bg-gray-800 p-2 rounded text-gray-400">
        <li className="flex items-center mx-2">
          <div className="seat bg-gray-600 h-3 w-4 rounded-t-md"></div>
          <small className="ml-1">N/A</small>
        </li>
        <li className="flex items-center mx-2">
          <div className="seat bg-blue-600 h-3 w-4 rounded-t-md"></div>
          <small className="ml-1">Selected</small>
        </li>
        <li className="flex items-center mx-2">
          <div className="seat bg-white h-3 w-4 rounded-t-md"></div>
          <small className="ml-1">Occupied</small>
        </li>
      </ul>

      <select onChange={handleMovieSelect} className="appearance-none bg-gray-700 p-2 mt-4 rounded">
        <option value="10">Movie 1 ($10)</option>
        <option value="12">Movie 2 ($12)</option>
        <option value="8">Movie 3 ($8)</option>
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="my-4 p-2 border border-gray-300 rounded"
      />

      <div className="container flex flex-col items-center mt-10">
        <div className="screen bg-white w-3/4 h-16 my-4 transform rotate-x-45 shadow-lg"></div>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row flex justify-center my-1">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat h-10 w-10 m-1 rounded-t-md ${seat === 'available' ? 'bg-gray-600' : seat === 'reserved' ? 'bg-blue-600' : 'bg-white cursor-not-allowed'}`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text">Selected Seats: <span>{selectedSeatsCount}</span></p>
        <p className="text">Total Price: <span>${selectedSeatsCount * ticketPrice}</span></p>
      </div>
    </div>
  );
};

export default SeatLayout;
