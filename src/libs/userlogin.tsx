import axios from "axios";

export default async function userLogIn(userEmail: string, userPassword: string) {
    try {
        const response = await axios.post(
            "https://restaurant-api-fawn.vercel.app/api/stb/auth/login",
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
