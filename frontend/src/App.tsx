import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import RequestOtp from './pages/RequestOtp';
import { LandingPage } from './pages/LandingPage';
import { HamburgerMenu } from './pages/HamburgerMenu'
import { MyBookings } from './components/LeftNavigation/MyBookings';
import { ContactUsPage } from './pages/ContactUs';

function AppContent() {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/request-otp" element={<RequestOtp />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/' element={<LandingPage />} />
                <Route path='/hamburger' element={<HamburgerMenu />} />
                <Route path='/mybookings' element={<MyBookings />} />
                <Route path='/contact-us' element={<ContactUsPage />} />   
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
