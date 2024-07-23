import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import SeatLayout from './pages/SeatLayout';
import { Navbar } from './pages/NavigationBar';
function App() {
    // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    // const [user, setUser] = useState<{ id: string; name: string } | null>(null);

    // const handleSignIn = (token: string, user: { id: string; name: string }) => {

    //     localStorage.setItem('authToken', token);
    //     setUser(user);
    //     setIsAuthenticated(true);
    // };

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
            {/* {isAuthenticated && <div>Welcome, {user?.name}!</div>} */}
        </div>
    );
}

export default App;
