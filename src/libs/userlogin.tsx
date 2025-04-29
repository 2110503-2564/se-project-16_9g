import axios from "axios";

export default async function userLogIn(userEmail: string, userPassword: string) {
    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    // if (!backendUrl) {
    //     throw new Error("BACKEND_URL is not defined in environment variables");
    // }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/stb/auth/login`,
            {
                email: userEmail,
                password: userPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to log in");
    }
}
