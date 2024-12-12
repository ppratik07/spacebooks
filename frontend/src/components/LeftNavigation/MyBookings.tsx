import React, { useEffect, useState } from "react";
import { useBooking } from "../Context/BookingContext";

export const MyBookings: React.FC = () => {
  const { bookingData } = useBooking();
  const [myBooking, setMyBooking] = useState<any | null>(null);
  const userName = localStorage.getItem("name");

  // Set the booking details when bookingData changes
  useEffect(() => {
    if (bookingData && bookingData.length > 0) {
      setMyBooking(bookingData[0]); // Assuming bookingData is an array, pick the first booking
    }
  }, [bookingData]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
      {!myBooking ? (
        <p>Hi {userName}, You don't have any active bookings.</p>
      ) : (
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {myBooking.name}
          </div>
          <div>
            <strong>Date:</strong> {myBooking.date}
          </div>
          <div>
            <strong>Start Time:</strong> {myBooking.startTime}
          </div>
          <div>
            <strong>End Time:</strong> {myBooking.endTime}
          </div>
        </div>
      )}
    </div>
  );
};
