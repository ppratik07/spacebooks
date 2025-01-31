import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

interface Booking {
  id: number;
  title: string; 
  date: string; 
}

const MyFullCalendar = () => {
  const userId = localStorage.getItem('userID');
  const [events, setEvents] = useState<Booking[]>([]); 

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bookings/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();

        const formattedEvents = data.bookings.map((booking: any) => ({
          id: booking.id,
          title: booking.title || 'Seat Booking', 
          date: booking.date, 
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">See your bookings : </h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default MyFullCalendar;
