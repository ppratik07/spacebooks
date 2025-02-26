import { useEffect } from "react"
import SideNavigation from "../components/LeftNavigation/SideNavigation";
import { BookingProvider } from "../components/Context/BookingContext";
import { useNavigate } from "react-router-dom";

export const HamburgerMenu = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const expiration = localStorage.getItem("token_expiration");
        if (!token || (expiration && Date.now() > Number(expiration))) {
            alert("Session terminated. Please login again.");
            localStorage.clear();
            navigate("/login");
        }
    }, [])
    return (
        <div>
            <BookingProvider>
                <SideNavigation />
            </BookingProvider>
        </div>
    );
}