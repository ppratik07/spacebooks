import { HeaderNavigation } from "./HeaderNavigation";
import { LandingHeroSection } from "../ui/LandingCarouselSection";

export const HeroSection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] to-[#ffffff] pl-40 pr-36">
            <HeaderNavigation />
            <LandingHeroSection/> 
        </div>
    );
}