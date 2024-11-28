import { BookingFeatures } from "../components/BookingFeatures"
import FooterBanner from "../components/FooterBanner"
import { FooterSection } from "../components/FooterSection"
import { HeroSection } from "../components/HeroSection"
import { MainHeadline } from "../components/MainHeadline"
import Testimonials from "../components/Testimonials"

export const LandingPage = ()=>{
    return(
         <div>
            <HeroSection/>
            <MainHeadline/>
            <BookingFeatures/>
            <Testimonials/>
            <FooterBanner/>
            <FooterSection/>
        </div>
    )
}