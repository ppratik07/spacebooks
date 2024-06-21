import { useState } from "react"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import axios from "axios"
import { BottomWarning } from "../components/Warning"

export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    return <div>
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
                <div className="py-2">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/signup", {
                            username,
                            password,
                            name
                        });
                        localStorage.setItem('token', response.data.token);
                    }} type={"submit"} label={"Submit"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/login"} />
            </div>
        </div>
    </div>
}