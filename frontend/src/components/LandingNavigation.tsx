
export const LandingNavigation = () => {
    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://www.zoho.com/sites/zweb/images/creator/appdeck/seat-booking.svg" className="h-8" alt="bus Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Book Your Seat</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                      <div className="text-red-500 font-serif text-xs">
                        <a href="/login">SIGN IN</a>
                      </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}