import { useBooking } from "../Context/BookingContext";

export const MyBookings = () => {
    const { bookingData } = useBooking();
    const hasBooking = bookingData && Object.keys(bookingData).length > 0;

    return (
        <div className="p-4">
            {hasBooking ? (
                <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex justify-end p-4">
                        <button
                            id="dropdownButton"
                            data-dropdown-toggle="dropdown"
                            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                            type="button"
                        >
                            <span className="sr-only">Open dropdown</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                            >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                            </svg>
                        </button>
                        <div
                            id="dropdown"
                            className="hidden z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800"
                        >
                            <ul className="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Edit
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center pb-6">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src="/docs/images/people/profile-picture-3.jpg"
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
                    <p className="text-gray-500 dark:text-gray-300">
                        No booking data available.
                    </p>
                </div>
            )}
        </div>
    );
};
