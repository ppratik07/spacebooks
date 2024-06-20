import React, { useState } from "react"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox";
import { BottomWarning } from "../components/Warning";
export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username == '' || password == '') {
            setError('Username and password are required');
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                //@ts-ignore
                window.location = "/profile";
            } else {
                alert("invalid credentials");
            }
        } catch (error) {
            setError('Failed to sign in. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    }
    return <div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Heading label={"Sign in to your account"} />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                    <InputBox label={"Email address"} id={"email"} type={"email"} value={username} onChange={handleUsernameChange} />

                    <div>
                        <InputBox label={"Password"} id={"password"} type={"password"} value={password} onChange={handlePasswordChange} />
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md
                         bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                          hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/register"} />
        </div>
    </div>
}