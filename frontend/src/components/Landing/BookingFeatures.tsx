export const BookingFeatures = () =>{
    return (
        <div className="bg-gray-50 py-16 px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="relative bg-white shadow-lg rounded-2xl p-6">
            <div className="absolute -top-6 left-6">
              <span className="bg-purple-500 text-white py-1 px-4 rounded-full text-sm shadow-lg">
                Book personal desks
              </span>
            </div>
            <img
              src="/office.jpg" 
              alt="Desk"
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-800 text-lg">
              With maximum flexibility, easily book personal desks for your team.
            </p>
          </div>
  
          {/* Card 2 */}
          <div className="relative bg-white shadow-lg rounded-2xl p-6">
            <div className="absolute -top-6 left-6">
              <span className="bg-orange-400 text-white py-1 px-4 rounded-full text-sm shadow-lg">
                Book meeting rooms
              </span>
            </div>
            <img
              src="/meetingroom.jpg" 
              alt="Meeting Room"
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-800 text-lg">
              Find easy-to-book, easy-to-reschedule meeting rooms for all
              participants.
            </p>
          </div>
  
          {/* Card 3 */}
          <div className="relative bg-white shadow-lg rounded-2xl p-6">
            <div className="absolute -top-6 left-6">
              <span className="bg-yellow-400 text-purple-700 py-1 px-4 rounded-full text-sm shadow-lg">
                Find options for booking
              </span>
            </div>
            <img
              src="/calendericon.jpg" 
              alt="Calendar"
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-800 text-lg">
              A convenient calendar view to choose the best options for booking.
            </p>
          </div>
  
          {/* Card 4 */}
          <div className="relative bg-white shadow-lg rounded-2xl p-6">
            <div className="absolute -top-6 left-6">
              <span className="bg-purple-500 text-white py-1 px-4 rounded-full text-sm shadow-lg">
                Collaborate with colleagues
              </span>
            </div>
            <img
              src="idcard.jpg" 
              alt="Profile"
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-800 text-lg">
              Seamlessly collaborate and manage your meetings with your
              colleagues.
            </p>
          </div>
        </div>
  

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Create a platform that helps employees to easily book a workplace...
          </h2>
        </div>
      </div>
    );
}