export const ConfirmationPage: React.FC = () => {
    return (
        <div> 
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
                    {/* Success Icon */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Payment successful
                    </h2>

                    {/* Description */}
                    <p className="text-gray-500 mb-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
                        amet labore.
                    </p>

                    {/* Action Button */}
                    <button className="w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                        Go back to dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}