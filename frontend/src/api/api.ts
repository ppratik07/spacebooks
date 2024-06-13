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
    const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Failed to sign in');
    }

    return response.json();
}
