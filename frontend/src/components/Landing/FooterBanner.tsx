import { useNavigate } from "react-router-dom";

const FooterBanner = () => {
    const navigate = useNavigate();
    const handleClick : () => void = ()=>{    
        navigate('/login');
    }    
    return (
        <div className="bg-blue-600 text-white py-12 sm:py-16 text-center px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Elevate Your Workspace <br className="hidden sm:block" /> with Spacebooks
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light mb-6">
                Say goodbye to the chaos of space allocation and <br className="hidden sm:block" />
                welcome a new era of workplace harmony.
            </p>
            <button 
                onClick={handleClick} 
                className="bg-white text-blue-600 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-md shadow-md hover:bg-blue-50 transition duration-300 text-sm sm:text-base"
            >
                Get Started Free
            </button>
        </div>
    );
};

export default FooterBanner;
