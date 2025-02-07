import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import SeatLayout from './pages/_SeatLayout';
import { Navbar } from './pages/_NavigationBar';
import RequestOtp from './pages/RequestOtp';
import { LandingPage } from './pages/LandingPage';
import CSVUpload from './components/ui/_CSVUpload';
import FloorPlan from './components/ui/FloorPlan';
import { HamburgerMenu } from './pages/HamburgerMenu'
import { MainPage } from './pages/_MainPage';
import { MyBookings } from './components/LeftNavigation/MyBookings';
import { ContactUsPage } from './pages/ContactUs';
// import { ConfirmationPage } from './components/ui/Confirmation';
// import { TestPage } from './components/Testpage;

function AppContent() {
    const location = useLocation();
    const excludeNavbarPaths = ['/login', '/register', '/resetpassword', '/request-otp', '/reset-password', '/', '/main', '/hamburger', '/mybookings', 'testpage', '/confirmation', '/contact-us'];

    return (
        <>
            {!excludeNavbarPaths.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/seatlayout" element={<SeatLayout />} />
                <Route path="/request-otp" element={<RequestOtp />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/' element={<LandingPage />} />
                <Route path='/csv' element={<CSVUpload />} />
                <Route path='/floor' element={<FloorPlan />} />
                <Route path='/main' element={<MainPage />} />
                <Route path='/hamburger' element={<HamburgerMenu />} />
                <Route path='/mybookings' element={<MyBookings />} />
                <Route path='/contact-us' element={<ContactUsPage />} />
                {/* <Route path='/confirmation' element={<ConfirmationPage/>}/> */}
                {/* <Route path='/testpage' element={<TestPage/>}/> */}
            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
