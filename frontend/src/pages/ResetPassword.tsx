import { useState } from "react"
import { Heading } from "../components/Heading";
import InputBox from "../components/InputBox";
import { Button } from "../components/Button";
import axios from "axios";

export const ResetPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [newpassword, setnewPassword] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setnewPassword(e.target.value);
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            }
        } catch (error) {
            alert("Internal Server Occured! Please try again later");
        }
    }
    return (
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
            </div>
        </div>
    );
}