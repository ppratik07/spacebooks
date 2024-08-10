import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/Button';
import InputBox from '../components/InputBox';
import { Heading } from '../components/Heading';

const RequestOtp = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRequestOtp = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/request-otp', { email });
            setMessage('OTP sent to your email');
        } catch (error) {
            setMessage('Error sending OTP');
        }
    };

    return (
        <form onSubmit={handleRequestOtp}>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Heading label={"Reset your account"} />
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <InputBox label={"Email address"} id={"email"} type={"email"} value={email} onChange={(e: any) => {
                        setEmail(e.target.value);
                    }} />
                    <div className="py-2">
                        <button type={"submit"}>Send OTP</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RequestOtp;
