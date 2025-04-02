import { HeaderNavigation } from "./HeaderNavigation";
import { LandingHeroSection } from "../ui/LandingCarouselSection";

export const HeroSection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] to-[#ffffff] px-4 sm:px-8 md:pl-40 md:pr-36">
            <HeaderNavigation />
            <LandingHeroSection/> 
        </div>
    );
}