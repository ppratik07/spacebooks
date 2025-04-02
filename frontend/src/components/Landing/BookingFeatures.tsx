export const BookingFeatures = () =>{
    return (
        <div className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                <div className="relative bg-white shadow-lg rounded-2xl p-4 sm:p-6">
                    <div className="absolute -top-4 sm:-top-6 left-4 sm:left-6">
                        <span className="bg-purple-500 text-white py-1 px-3 sm:px-4 rounded-full text-xs sm:text-sm shadow-lg">
                            Book personal desks
                        </span>
                    </div>
                    <img
                        src="/office.jpg" 
                        alt="Desk"
                        className="w-full h-auto rounded-lg mb-4"
                    />
                    <p className="text-gray-800 text-base sm:text-lg">
                        With maximum flexibility, easily book personal desks for you.
                    </p>
                </div>

                <div className="relative bg-white shadow-lg rounded-2xl p-4 sm:p-6">
                    <div className="absolute -top-4 sm:-top-6 left-4 sm:left-6">
                        <span className="bg-orange-400 text-white py-1 px-3 sm:px-4 rounded-full text-xs sm:text-sm shadow-lg">
                            Book meeting rooms
                        </span>
                    </div>
                    <img
                        src="/meetingroom.jpg" 
                        alt="Meeting Room"
                        className="w-full h-auto rounded-lg mb-4"
                    />
                    <p className="text-gray-800 text-base sm:text-lg">
                        Find easy-to-book, easy-to-reschedule meeting rooms for 
                        participants.
                    </p>
                </div>

                <div className="relative bg-white shadow-lg rounded-2xl p-4 sm:p-6">
                    <div className="absolute -top-4 sm:-top-6 left-4 sm:left-6">
                        <span className="bg-yellow-400 text-purple-700 py-1 px-3 sm:px-4 rounded-full text-xs sm:text-sm shadow-lg">
                            Find options for booking
                        </span>
                    </div>
                    <img
                        src="/calendericon.jpg" 
                        alt="Calendar"
                        className="w-full h-auto rounded-lg mb-4"
                    />
                    <p className="text-gray-800 text-base sm:text-lg">
                        A convenient calendar view to choose the best options for booking.
                    </p>
                </div>

                <div className="relative bg-white shadow-lg rounded-2xl p-4 sm:p-6">
                    <div className="absolute -top-4 sm:-top-6 left-4 sm:left-6">
                        <span className="bg-purple-500 text-white py-1 px-3 sm:px-4 rounded-full text-xs sm:text-sm shadow-lg">
                            Collaborate with colleagues
                        </span>
                    </div>
                    <img
                        src="idcard.jpg" 
                        alt="Profile"
                        className="w-full h-auto rounded-lg mb-4"
                    />
                    <p className="text-gray-800 text-base sm:text-lg">
                        Seamlessly collaborate and manage your meetings with your
                        colleagues.
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mt-12 md:mt-16 text-center px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    Create a platform that helps employees to easily book a workplace...
                </h2>
            </div>
        </div>
    );
}