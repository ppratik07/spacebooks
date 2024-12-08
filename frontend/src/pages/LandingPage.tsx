import { BookingFeatures } from "../components/Landing/BookingFeatures"
import FAQSection from "../components/Landing/FAQs"
import FooterBanner from "../components/Landing/FooterBanner"
import { FooterSection } from "../components/Landing/FooterSection"
import { HeroSection } from "../components/Landing/HeroSection"
import { MainHeadline } from "../components/Landing/MainHeadline"
import Testimonials from "../components/Landing/Testimonials"

export const LandingPage = ()=>{
    return(
         <div>
            <HeroSection/>
            <MainHeadline/>
            <BookingFeatures/>
            <Testimonials/>
            <FooterBanner/>
            <FAQSection/>
            <FooterSection/>
        </div>
    )
}