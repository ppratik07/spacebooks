import { useBooking } from "../Context/BookingContext";

export const MyBookings = () => {
  const { bookingData } = useBooking();

  return (
    <div>
      {bookingData ? (
        <div>
          <p>Name: {bookingData.name}</p>
          <p>Date: {bookingData.date}</p>
          <p>Start Time: {bookingData.startTime}</p>
          <p>End Time: {bookingData.endTime}</p>
        </div>
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
};

