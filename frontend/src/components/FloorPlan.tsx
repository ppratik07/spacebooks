// src/components/FloorPlan.tsx
import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

// Define a type for Desk
type Desk = {
  id: number;
  x: number;
  y: number;
  isBooked: boolean;
};

const initialDesks: Desk[] = [
  { id: 1, x: 50, y: 50, isBooked: false },
  { id: 2, x: 200, y: 50, isBooked: true },
  { id: 3, x: 50, y: 200, isBooked: false },
  { id: 4, x: 200, y: 200, isBooked: false },
];

const FloorPlan: React.FC = () => {
  const [desks, setDesks] = useState(initialDesks);

  const handleDeskClick = (deskId: number) => {
    setDesks((prevDesks) =>
      prevDesks.map((desk) =>
        desk.id === deskId ? { ...desk, isBooked: !desk.isBooked } : desk
      )
    );
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Interactive Floor Plan" fontSize={24} x={20} y={20} />
        {desks.map((desk) => (
          <Rect
            key={desk.id}
            x={desk.x}
            y={desk.y}
            width={100}
            height={100}
            fill={desk.isBooked ? 'red' : 'green'}
            stroke="black"
            strokeWidth={2}
            onClick={() => handleDeskClick(desk.id)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default FloorPlan;
