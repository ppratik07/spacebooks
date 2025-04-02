import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const HeaderNavigation = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignIn = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            <header className="flex justify-between items-center px-4 md:px-10 py-5">
                <h1 className="text-xl font-bold">SpaceBooks</h1>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#product" className="hover:text-blue-600">Product</a>
                    <a href="#community" className="hover:text-blue-600">Community</a>
                    <a href="/contact-us" className="hover:text-blue-600">Plans</a>
                </nav>

                {/* Desktop Buttons */}
                <div className="hidden md:flex space-x-4">
                    <button onClick={handleSignIn} className="px-4 py-2 border rounded hover:bg-gray-100">Log In</button>
                    <button onClick={handleSignUp} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleMenu}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </header>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute w-full bg-white shadow-lg z-50">
                    <nav className="flex flex-col space-y-4 p-4">
                        <a href="#product" className="hover:text-blue-600 py-2">Product</a>
                        <a href="#community" className="hover:text-blue-600 py-2">Community</a>
                        <a href="/contact-us" className="hover:text-blue-600 py-2">Plans</a>
                        <div className="flex flex-col space-y-2 pt-2 border-t">
                            <button onClick={handleSignIn} className="px-4 py-2 border rounded hover:bg-gray-100">Log In</button>
                            <button onClick={handleSignUp} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</button>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}