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
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Booking | null>(null);
    
    const convertToAMPM = (time: string): string => {
        const [hour, minute] = time.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12; // Convert 0 to 12 for AM/PM
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };

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

    const handleEdit = (booking: Booking) => {
        setEditData(booking);
        setIsEditing(true);
    }

    const handleSave = async (id: number, updatedData: Partial<Booking>) => {
        setLoading(true);
        const updatedBookingData = {
            ...updatedData,
            startTime: updatedData.startTime ? convertToAMPM(updatedData.startTime) : undefined,
            endTime: updatedData.endTime ? convertToAMPM(updatedData.endTime) : undefined,
        };

        try {
            const response = await fetch(`http://localhost:3000/bookings/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBookingData),
            });
            if (response.ok) {
                const updatedBooking = await response.json();
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking.id === updatedData.id ? { ...booking, ...updatedBooking.updatedBooking } : booking
                    )
                );
                alert("Booking Updated Successfully!");
                setIsEditing(false);
            }
            else{
                alert("Failed to Update Booking");
            }
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("An error occurred while updating the booking.");
        }finally {

            setTimeout(() => {
                setLoading(false);
            }, 2000);
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
                                    <button onClick={() => handleEdit(booking)}
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
            {/* Show the form if we are editing */}
            {isEditing && editData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl mb-4">Edit Booking</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (editData) {
                                    handleSave(editData.id, {
                                        name: editData.name,
                                        startTime: editData.startTime,
                                        endTime: editData.endTime,
                                    });
                                }
                            }}
                        >
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={editData.name}
                                    disabled
                                    onChange={(e) =>
                                        setEditData({ ...editData, name: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="startTime" className="block text-gray-700">Start Time</label>
                                <input
                                    type="time"
                                    id="startTime"
                                    value={editData.startTime}
                                    onChange={(e) =>
                                        setEditData({ ...editData, startTime: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="endTime" className="block text-gray-700">End Time</label>
                                <input
                                    type="time"
                                    id="endTime"
                                    value={editData.endTime}
                                    onChange={(e) =>
                                        setEditData({ ...editData, endTime: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Date" className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={editData.date}
                                    onChange={(e) =>
                                        setEditData({ ...editData, date: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
