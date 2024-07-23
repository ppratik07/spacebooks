import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const Logout: React.FC = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <Button onClick={handleLogOut} type="button" label="Logout" />
        </div>
    )
}