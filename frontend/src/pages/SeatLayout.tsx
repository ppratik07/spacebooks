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
                .get(`/api/seats?date=${selectedDate}`, {
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
                    '/api/reserve',
                    { seatId: seat.id, date: selectedDate },
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                .then(response => {
                    setSeats(prevSeats =>
                        prevSeats.map(s =>
                            s.id === seat.id ? { ...s, status: 'reserved' } : s
                        )
                    );
                })
                .catch(error => {
                    console.error('Error reserving seat', error);
                });
        }
    };

    // Create a 2D array representation of the seats for a grid layout
    const seatMap: SeatData[][] = Array.from({ length: 10 }, (_, row) =>
        seats.slice(row * 10, row * 10 + 10)
    );

    return (
        <div className="seat-layout">
            <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="my-4 p-2 border border-gray-300 rounded"
            />
            <div className="grid grid-cols-3 grid-rows-2">                      
                {seatMap.map((row, rowIndex) =>
                    row.map(seat => (
                        <Seat key={seat.id} seat={seat} onClick={() => handleSeatClick(seat)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SeatLayout;
