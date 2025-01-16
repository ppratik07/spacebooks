import React from "react";

export const ContactUsPage = () => {
  return (
    <section
      className="relative bg-gray-900 py-16"
      style={{
        backgroundImage: "url('https://t4.ftcdn.net/jpg/04/03/23/45/240_F_403234519_pnvAvuAdxGwRppiYULdi2O12ZKCVxckc.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Contact Us</h2>
          <p className="mt-4 text-gray-400">
            We use an agile approach to test assumptions and connect with the needs of your audience early and often.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  placeholder="Bonnie"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  placeholder="Green"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@flowbite.com"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+12 345 6789"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Leave a comment..."
                className="mt-1 block w-full px-4 py-2 bg-gray-700 rounded-md border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              By submitting this form you agree to our terms and conditions and our privacy policy which explains how we may collect, use and disclose your personal information including to third parties.
            </p>
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 12.75V15a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 15v-8.25m19.5 0V9m0 0a2.25 2.25 0 01-2.25-2.25M21.75 9l-9-6.75m0 0L3.75 9M12 2.25V9"
                />
              </svg>
              <p className="mt-2">Email us:</p>
              <p className="text-sm text-gray-400">name@flowbite.com</p>
            </div>
          </div>
          <div>
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75V15a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 15V6.75M21.75 6.75V6M21.75 6l-9-6-9 6m9-6v6.75"
                />
              </svg>
              <p className="mt-2">Call us:</p>
              <p className="text-sm text-gray-400">+12 345 6789</p>
            </div>
          </div>
          <div>
            <div className="text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z"
                />
              </svg>
              <p className="mt-2">Support:</p>
              <p className="text-sm text-gray-400">support@flowbite.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

