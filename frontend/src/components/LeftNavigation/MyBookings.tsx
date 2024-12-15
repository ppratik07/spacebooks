import { useBooking } from "../Context/BookingContext";

export const MyBookings = () => {
    const { bookingData } = useBooking();
    const hasBooking = bookingData && Object.keys(bookingData).length > 0;
    const userName = localStorage.getItem("name");
    return (
        <div className="p-4">
            {hasBooking ? (
                <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex justify-end p-4">
                    </div>
                    <div className="flex flex-col items-center pb-6">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src="/Unknown.jpg"
                            alt="Profile"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {bookingData.name}
                        </h5>
                        <div className="flex flex-col mt-4 text-center">
                            <p className="text-gray-700 dark:text-gray-300">
                                Date: {bookingData.date}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Start Time: {bookingData.startTime}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                End Time: {bookingData.endTime}
                            </p>
                        </div>
                        <div className="flex mt-4 space-x-2">
                            <a
                                href="#"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                Edit
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                            >
                                Delete
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-500 dark:text-black">
                      Hi {userName}, You don't have any active bookings !
                    </p>
                </div>
            )}
        </div>
    );
};
