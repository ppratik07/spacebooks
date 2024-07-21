import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Seat {
  id: number;
  label: string;
  x: number;
  y: number;
  status: string;
}

const SeatLayout: React.FC = () => {
  const [seats, setSeats] = useState<Seat[][]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedSeatLabel, setSelectedSeatLabel] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    const fetchSeats = async () => {
      if (selectedDate) {
        try {
          const response = await axios.get(`/api/seats?date=${selectedDate}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const seats: Seat[] = response.data;

          // Group seats by rows for layout
          const seatsByRows: Seat[][] = [];
          seats.forEach((seat) => {
            if (!seatsByRows[seat.x]) {
              seatsByRows[seat.x] = [];
            }
            seatsByRows[seat.x][seat.y] = seat;
          });

          setSeats(seatsByRows);
        } catch (error) {
          console.error('Error fetching seats', error);
        }
      } else {
        setSeats(Array(6).fill(Array(8).fill({ id: 0, label: '', x: 0, y: 0, status: 'available' })));
        setSelectedSeat(null);
        setSelectedSeatLabel('');
      }
    };

    fetchSeats();
  }, [selectedDate, token]);

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    if (seats[rowIndex][seatIndex].status !== 'available') return;

    setSeats(prevSeats => {
      return prevSeats.map((row, rIndex) =>
        row.map((seat, sIndex) => {
          if (rIndex === rowIndex && sIndex === seatIndex) {
            setSelectedSeat(seat);
            setSelectedSeatLabel(seat.label);
            return { ...seat, status: 'selected' };
          } else if (seat.status === 'selected') {
            return { ...seat, status: 'available' };
          }
          return seat;
        })
      );
    });
  };

  const reserveSeat = async () => {
    if (!selectedSeat) {
      alert('Please select a seat to reserve.');
      return;
    }

    const seatId = selectedSeat.id;
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    try {
      await axios.post(
        'http://localhost:3000/api/reserve',
        { seatId, date: formattedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Seat reserved successfully');
    } catch (error) {
      console.error('Error reserving seat', error);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSeats(Array(6).fill(Array(8).fill({ id: 0, label: '', x: 0, y: 0, status: 'available' })));
    setSelectedSeat(null);
    setSelectedSeatLabel('');
  };

  return (
    <div className="movie-container flex flex-col items-center justify-center text-white">
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="my-4 p-2 border border-gray-300 rounded"
      />
      <div className="container flex flex-col items-center mt-10">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="row flex justify-center my-1">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat h-10 w-10 m-1 rounded-t-md ${seat.status === 'available' ? 'bg-gray-600' : seat.status === 'selected' ? 'bg-blue-600' : 'bg-white cursor-not-allowed'}`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center justify-center">
        <button onClick={reserveSeat} className="bg-blue-500 text-white p-2 rounded mt-2">Reserve</button>
        {selectedSeatLabel && <p className="mt-2 text-black">Selected Seat: {selectedSeatLabel}</p>}
      </div>
      <div className='mt-4'>
        <ul className="showcase flex justify-between bg-gray-800 p-2 rounded text-gray-400">
          <li className="flex items-center mx-2">
            <div className="seat bg-gray-600 h-3 w-4 rounded-t-md"></div>
            <small className="ml-1">Available</small>
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
      </div>
    </div>
  );
};

export default SeatLayout;
