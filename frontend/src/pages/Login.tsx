import React, { useState } from "react"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox";
import { BottomWarning } from "../components/Warning";
import { Button } from "../components/Button";
export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            //@ts-ignore
            window.location = "/seatlayout";
        } else {
            alert("invalid credentials");
        }
    }
    return <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Heading label={"Sign in to your account"} />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                
                    <InputBox label={"Email address"} id={"email"} type={"email"} value={username} onChange={handleUsernameChange} />

                    <div>
                        <InputBox label={"Password"} id={"password"} type={"password"} value={password} onChange={handlePasswordChange} />
                    </div>

                    <div className="py-2">
                           <Button onClick={handleSubmit} label={"Submit"}></Button>
                    </div>
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/register"} />
            <div>
            <BottomWarning label={"Forgot your account?"} buttonText={"Reset Password"} to={"/resetpassword"} />
            </div>
        </div>
    </div>
}