import axios from "axios";

export default async function userRegister(
    userEmail: string,
    userPassword: string,
    name: string,
    tel: string
) {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/stb/auth/register",
            {
                name,
                email: userEmail,
                password: userPassword,
                tel,
                role: "user",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to register");
    }
}
