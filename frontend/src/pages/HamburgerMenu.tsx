import React from "react"
import SideNavigation from "../components/LeftNavigation/SideNavigation";
import { BookingProvider } from "../components/Context/BookingContext";

export const HamburgerMenu = () => {
    return (
        <div>
            <BookingProvider>
                <SideNavigation />
            </BookingProvider>
        </div>
    );
}