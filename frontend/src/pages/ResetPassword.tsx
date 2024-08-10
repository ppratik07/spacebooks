import { useState } from "react"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox"
import { Button } from "../components/Button";
import axios from "axios";

export const ResetPassword = () => {

    const [EmailSent, SetEmailSent] = useState<string>("");

    return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Heading label={"Reset your account"} />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <InputBox label={"Email address"} id={"email"} type={"email"} value={EmailSent} onChange={(e) => {
                SetEmailSent(e.target.value);
            }} />

            <div className="py-2">
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/request-otp",{
                        EmailSent
                    });
                    if(response.status == 200){
                        alert("OTP has been sent to your registered email address");
                    }else{
                        alert("An error occured while sending OTP");
                    }
                }} type={"submit"} label={"Submit"} />
            </div>
        </div>
    </div>
}