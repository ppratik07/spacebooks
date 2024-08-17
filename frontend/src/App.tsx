import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import SeatLayout from './pages/SeatLayout';
import { Navbar } from './pages/NavigationBar';
import RequestOtp from './pages/RequestOtp';
import { LandingPage } from './pages/LandingPage';

function AppContent() {
    const location = useLocation();
    const excludeNavbarPaths = ['/login', '/register', '/resetpassword','/request-otp','/reset-password'];

    return (
        <>
            {!excludeNavbarPaths.includes(location.pathname) && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/seatlayout" element={<SeatLayout />} />
                <Route path="/request-otp" element={<RequestOtp />} />
                <Route path='/reset-password' element={<ResetPassword/>}/>
                <Route path='/' element={<LandingPage/>}/>
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
