import { Header } from "./Header";

export const HeroSection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] to-[#ffffff] pl-40 pr-36">
            <Header />
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between px-10 pt-28">
                <div className="max-w-lg text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Smart way to manage <span className="text-blue-600">spaces</span>
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Better experience of workplace scheduling
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Try Free Trial
                    </button>
                </div>
                <div className="relative mt-10 md:mt-0">
                  
                    <img
                        src="/personIllustrator.png"
                        alt="Illustration"
                        className="w-full max-w-md"
                    />
            
                    <div className="absolute top-10 -left-12">
                        <img src="/pin.png" alt="Pin" className="w-12" />
                    </div>
                    <div className="absolute bottom-10 left-12">
                        <img src="/calender.png" alt="Calendar" className="w-14" />
                    </div>
                    <div className="absolute bottom-12 right-10">
                        <img src="/mug.png" alt="Mug" className="w-12" />
                    </div>
                </div>
            </section>
        </div>
    );
}