import { useEffect, useState } from "react";

interface Booking {
    id: number;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
}
export const MyBookings = () => {
    //const { bookingData } = useBooking(); // for context 
    const userName = localStorage.getItem("name"); 
    const userId = localStorage.getItem("userID");
    const [bookings, setBookings] = useState<Booking[]>([]); // Store fetched bookings
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:3000/bookings/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch bookings");
                }
                const data = await response.json();
                setBookings(data.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setBookings(([]));
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchBookings();
        }
    }, [userId]);

    const deleteBooking = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/bookings/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setBookings((prev) => prev.filter((booking) => booking.id !== id))
                alert("deleted");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert("Error deleting");
        }
    };

    const editBooking = async (id: number, updatedData: Partial<Booking>) => {
        try {
            const response = await fetch("http://localhost:3000/bookings/${id}", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                const updatedBooking = await response.json();
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking.id === id ? { ...booking, ...updatedBooking.updatedBooking } : booking
                    )
                );
            }
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    }

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex space-x-4 overflow-x-auto">
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div
                            key={index}
                            className="w-full max-w-sm mx-auto mb-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600"
                        >
                            <div className="flex justify-end p-4">

                            </div>
                            <div className="flex flex-col items-center pb-6">
                                <img
                                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                    src="/Unknown.jpg"
                                    alt="Profile"
                                />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {booking.name}
                                </h5>
                                <div className="flex flex-col mt-4 text-center">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Date: {new Date(booking.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Start Time: {booking.startTime}
                                    </p>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        End Time: {booking.endTime}
                                    </p>
                                </div>
                                <div className="flex mt-4 space-x-2">
                                    <button onClick={() => editBooking(booking.id, {
                                        date: booking.date,
                                        startTime: booking.startTime,
                                        endTime: booking.endTime
                                    })}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => deleteBooking(booking.id)}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center">
                        <p className="text-gray-500 dark:text-black">
                            Hi {userName}, You don't have any active bookings!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
