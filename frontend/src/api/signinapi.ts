import axios from "axios";

interface SignInResponse {
    token: string;
    user: {
        id: string;
        name: string;
    };
}

interface SignInRequest {
    username: string;
    password: string;
}

export async function signInApi({ username, password }: SignInRequest): Promise<SignInResponse> {
    const response = await axios.post('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return response.data;
}
