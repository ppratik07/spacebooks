// src/components/SeatLayout.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Seat from '../components/Seat';

interface SeatData {
    id: number;
    label: string;
    status: 'available' | 'reserved' | 'unavailable';
    x: number;
    y: number;
  }

const SeatLayout: React.FC = () => {
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(`/seat-layout?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setSeats(response.data);
        })
        .catch(error => {
          console.error('Error fetching seats', error);
        });
    }
  }, [selectedDate, token]);

  const handleSeatClick = (seat: SeatData) => {
    if (seat.status === 'available') {
      axios
        .post(
          '/reserve',
          { seatId: seat.id, date: selectedDate },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(response => {
          setSeats(prevSeats =>
            prevSeats.map(s =>
              s.id === seat.id ? { ...s, status: 'reserved' } : s
            )
          );
          console.log(response);
        })
        .catch(error => {
          console.error('Error reserving seat', error);
        });
    }
  };

  return (
    <div className="seat-layout">
      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        className="my-4 p-2 border border-red-300 rounded"
      />
      <div className="grid grid-cols-10 gap-2">
        {seats.map(seat => (
          <Seat key={seat.id} seat={seat} onClick={() => handleSeatClick(seat)} />
        ))}
      </div>
    </div>
  );
};

export default SeatLayout;
