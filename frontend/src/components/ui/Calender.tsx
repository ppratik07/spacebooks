import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const MyFullCalendar = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Full Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'Event 1', date: '2025-01-20' },
          { title: 'Event 2', date: '2025-01-21' },
        ]}
      />
    </div>
  );
};

export default MyFullCalendar;
