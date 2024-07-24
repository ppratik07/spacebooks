import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import SeatLayout from './pages/SeatLayout';
import { Navbar } from './pages/NavigationBar';
function App() {

    return (
        <div>
            <BrowserRouter>  
            <Navbar/> 
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/resetpassword' element={<ResetPassword />} />
                    <Route path='/seatlayout' element={<SeatLayout/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
