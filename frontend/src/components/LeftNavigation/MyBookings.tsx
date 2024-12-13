import { useBooking } from "../Context/BookingContext";

export const MyBookings = () => {
  const { bookingData } = useBooking();
  const hasBooking = bookingData && Object.keys(bookingData).length>0;

  return (
    <div>
      {hasBooking ? (
        <div>
          <p>Name: {bookingData.name}</p>
          <p>Date: {bookingData.date}</p>
          <p>Start Time: {bookingData.startTime}</p>
          <p>End Time: {bookingData.endTime}</p>
        </div>
      ) : (
        <div>
            <p>No booking data available.</p>
        </div>      
      )}
    </div>
  );
};

