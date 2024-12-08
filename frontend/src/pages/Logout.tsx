import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"

export const Logout: React.FC = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration');
        navigate('/login');
    }
    return (
        <div>
            <Button onClick={handleLogOut} type="button" label="Logout" />
        </div>
    )
}