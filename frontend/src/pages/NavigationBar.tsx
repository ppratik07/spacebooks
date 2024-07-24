import React, { useEffect, useState } from 'react';
import { Logout } from './Logout';

export const Navbar: React.FC = () => {
    const [timeLeft, settimeLeft] = useState(300);

    useEffect(() => {
        if (timeLeft <= 0) {
            alert("Session has been expired!Please try again !");
            return;
        }
    }, [timeLeft])

    //Clening up the set interval 
    useEffect(() => {
        const intervalId = setInterval(() => {
            settimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])

    const formatTime = (seconds: number) => {
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

