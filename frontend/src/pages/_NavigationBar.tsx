import React, { useEffect, useState } from 'react';
import { Logout } from './Logout';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const SESSION_DURATION = 300; // 5 minutes in seconds

    const getTimeLeft = () => {
        const savedTime = localStorage.getItem('timeLeft');
        const savedTimestamp = localStorage.getItem('timestamp');

        if (savedTime && savedTimestamp) {
            const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000);
            const newTimeLeft = parseInt(savedTime, 10) - elapsed;
            return newTimeLeft > 0 ? newTimeLeft : 0;
        }

        return SESSION_DURATION;
    };

    const [timeLeft, setTimeLeft] = useState<number>(getTimeLeft);

    const resetTimer = () => {
        localStorage.setItem('timeLeft', SESSION_DURATION.toString());
        localStorage.setItem('timestamp', Date.now().toString());
        setTimeLeft(SESSION_DURATION);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime - 1;
                if (newTime >= 0) {
                    localStorage.setItem('timeLeft', newTime.toString());
                    localStorage.setItem('timestamp', Date.now().toString());
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('timeLeft');
            localStorage.removeItem('timestamp');
            navigate('/login');
        }
    }, [timeLeft, navigate]);
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="text-white text-lg"><a href='/login'>Book My Seat</a></div>
            <div className='text-white text-center'>This Session expires in: {formatTime(timeLeft)}</div>
            <Logout />
        </nav>
    );
};

