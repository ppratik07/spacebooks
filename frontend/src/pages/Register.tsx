import { useState } from "react"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import axios from "axios"
import { BottomWarning } from "../components/Warning"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { LogoHeader } from "../components/LogoHeading"

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [MobileNumber, setMobileNumber] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    return <div>
        <LogoHeader/>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Heading label={"Sign up to your account"} />
                <SubHeading label={"Enter your infromation to create an account"} />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <InputBox label={"Email address"} id={"email"} type={"email"} value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} />

                <div>
                    <InputBox label={"Password"} id={"password"} type={"password"} value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <div>
                    <InputBox label={"Name"} id={"name"} type={"name"} value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div>
                    <InputBox label={"Mobile Number"} id={"mobilenumber"} type={"number"} value={MobileNumber} onChange={(e) => {
                        setMobileNumber(e.target.value);
                    }} />
                </div>
                <div className="py-2">
                    <Button onClick={async () => {
                        setLoading(true);
                        try {
                            const response = await axios.post("http://localhost:3000/signup", {
                                username,
                                password,
                                name
                            });
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('name', name);
                            if (response.status == 200) {
                                alert("User created successfully.Please click Ok to login");
                                navigate('/login')
                            } else {
                                alert('An error occurred. Please try again.');
                            }
                        } catch (error) {
                            alert('An internal server occurred. Please try again later!')
                        } finally {
                            setLoading(false);
                        }

                    }} type={"submit"} label={loading ? "Registering..." : "Register"} />

                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/login"} />
            </div>
            <div className="py-2 flex justify-center">
                {loading && <ClipLoader color={"#000000"} loading={loading} size={50} />}
            </div>
        </div>
    </div>
}