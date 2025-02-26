import { useState } from "react"
import { Heading } from "../components/ui/Heading";
import InputBox from "../components/ui/InputBox";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/ui/Warning";

export const ResetPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newpassword, setnewPassword] = useState<string>('');
    const navigate = useNavigate();
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setnewPassword(e.target.value);
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/reset-password', {
                email,
                otp,
                newpassword
            });
            console.log(response);
            if (response.status == 200) {
                alert("Password Changed Successfully !");
                navigate('/login');
            }
        } catch (error) {
            alert("Internal Server Occured! Please try again later");
        }
    }
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Heading label={"Please Enter your new password"} />
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <InputBox label={"Email address"} id={"email"} type={"email"} value={email} onChange={handleUsernameChange} />

                    <div>
                        <InputBox label={"otp"} id={"otp"} type={"string"} value={otp} onChange={handleOtpChange} />
                    </div>
                    <div>
                        <InputBox label={"Password"} id={"password"} type={"password"} value={newpassword} onChange={handlePasswordChange} />
                    </div>
                    <div className="py-2">
                        <Button onClick={handleSubmit} type={"button"} label={"Submit"}></Button>
                    </div>
                    <div>
                        <BottomWarning label={"Back to Login?"} buttonText={"Login"} to={"/login"} />
                    </div>
                </div>
            </div>
        </div>

    );
}