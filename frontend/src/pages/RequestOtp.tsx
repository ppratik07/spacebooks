import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../components/InputBox';
import { Heading } from '../components/Heading';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const RequestOtp = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleRequestOtp = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/request-otp', { email });
            setMessage('OTP sent to your email');
            alert("OTP has been sent to registered email address!")
            navigate('/reset-password');
        } catch (error) {
            setMessage('Error sending OTP');
            alert("Can't send OTP due to some internal Issue.Please try again later");
        }
        finally {
            setLoading(false);
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
                        <button type={"submit"} className="flex w-full justify-center rounded-md
    bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
     hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-indigo-600">Send OTP</button>
                    </div>
                </div>
                <div className='py-2 flex justify-center'>
                    {loading && <ClipLoader color={"#000000"} loading={loading} size={50} />}
                </div>
            </div>
        </form>
    );
};

export default RequestOtp;
