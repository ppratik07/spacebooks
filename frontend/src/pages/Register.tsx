import { useState } from "react"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import axios from "axios"

export const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");

    return <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Heading label={"Sign up to your account"} />
                <SubHeading label={"Enter your infromation to create an account"} />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <InputBox label={"Email address"} id={"email"} type={"email"} value={email} onChange={(e) => {
                    setEmail(e.target.value);
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
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/signup", {
                            email,
                            password,
                            name
                        });
                        localStorage.setItem('token', response.data.token);
                    }} type={"submit"} label={"Submit"} />
                </div>
            </div>
        </div>
    </div>
}