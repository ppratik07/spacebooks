import React, { createContext, useContext, useState } from "react";

interface Booking {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface BookingContextType {
  bookingData: Booking[];
  setBookingData: (data: Booking[]) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

import { ReactNode } from "react";

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingData, setBookingData] = useState<Booking[]>([]);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
