import React from 'react';

const FloorLayout = () => {
    return (
        <svg
            viewBox="0 0 800 600"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
        >
            {/* Background */}
            <rect width="100%" height="100%" fill="#f0f0f0" />

            {/* Example Rooms */}
            <rect x="50" y="50" width="200" height="150" fill="#e0e0e0" stroke="#000" />
            <text x="150" y="130" textAnchor="middle" fontSize="16">Room 101</text>

            <rect x="300" y="50" width="200" height="150" fill="#e0e0e0" stroke="#000" />
            <text x="400" y="130" textAnchor="middle" fontSize="16">Room 102</text>

            <rect x="550" y="50" width="200" height="150" fill="#e0e0e0" stroke="#000" />
            <text x="650" y="130" textAnchor="middle" fontSize="16">Room 103</text>

            {/* Example Desks */}
            <rect x="100" y="250" width="50" height="50" fill="#d3d3d3" stroke="#000" />
            <rect x="200" y="250" width="50" height="50" fill="#d3d3d3" stroke="#000" />

            <rect x="350" y="250" width="50" height="50" fill="#d3d3d3" stroke="#000" />
            <rect x="450" y="250" width="50" height="50" fill="#d3d3d3" stroke="#000" />

            <rect x="600" y="250" width="50" height="50" fill="#d3d3d3" stroke="#000" />
            <rect x="700" y="250" width="50" height="50" fill="#d3d3d3" stroke="#000" />

            {/* Example Pathways */}
            <line x1="50" y1="400" x2="750" y2="400" stroke="#000" strokeWidth="2" />
            <line x1="50" y1="500" x2="750" y2="500" stroke="#000" strokeWidth="2" />
        </svg>
    );
};

export default FloorLayout;
