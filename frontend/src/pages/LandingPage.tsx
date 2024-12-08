import { BookingFeatures } from "../components/BookingFeatures"
import FAQSection from "../components/FAQs"
import FooterBanner from "../components/FooterBanner"
import { FooterSection } from "../components/FooterSection"
import { HeroSection } from "../components/Landing/HeroSection"
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
            <FAQSection/>
            <FooterSection/>
        </div>
    )
}