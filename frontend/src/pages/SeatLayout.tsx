import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeatLayout: React.FC = () => {
    const [seats, setSeats] = useState(Array(6).fill(Array(8).fill('available')));
    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
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
            }
        };

        fetchSeats();
    }, [selectedDate, token]);

    const handleSeatClick = (rowIndex: number, seatIndex: number) => {
        const seatId = rowIndex * seats[0].length + seatIndex;
        if (seats[rowIndex][seatIndex] === 'available') {
            if (selectedSeat === null) {
                setSelectedSeat(seatId);
            } else if (selectedSeat === seatId) {
                setSelectedSeat(null); // Deselect if already selected
            } else {
                alert('You can only select one seat at a time.');
            }
        }
    };

    const reserveSeats = async () => {
        if (selectedSeat === null) {
            alert('Please select a seat before reserving.');
            return;
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;

        try {
            await axios.post(
                "http://localhost:3000/api/reserve",
                { seatId: selectedSeat, date: formattedDate }
                // { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Seat reserved successfully');
            setSelectedSeat(null); // Deselect after successful reservation
        } catch (error) {
            console.error('Error reserving seat', error);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        setSeats(Array(6).fill(Array(8).fill('available')));
        setSelectedSeat(null);
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
                        {row.map((seat, seatIndex) => {
                            const seatId = rowIndex * seats[0].length + seatIndex;
                            const isSelected = selectedSeat === seatId;
                            return (
                                <div
                                    key={seatIndex}
                                    className={`seat h-10 w-10 m-1 rounded-t-md ${seat === 'available' ? (isSelected ? 'bg-blue-600' : 'bg-gray-600') : 'bg-white cursor-not-allowed'}`}
                                    onClick={() => handleSeatClick(rowIndex, seatIndex)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-col items-center justify-center">
                <p className="text-violet-600">Selected Seat: <span>{selectedSeat !== null ? selectedSeat : 'None'}</span></p>
                <button onClick={reserveSeats} className="bg-blue-500 text-white p-2 rounded mt-2">Reserve</button>
            </div>
            <div className='mt-4'>
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
            </div>
        </div>
    );
};

export default SeatLayout;
