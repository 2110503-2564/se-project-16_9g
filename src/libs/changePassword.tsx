import axios from "axios";

export default async function ChangePassword(userid: string, token: string, currentPassword: string, newPassword: string) {
    try {
        const response = await axios.put(
            `https://restaurant-api-fawn.vercel.app/api/stb/auth/changepassword`,
            {
                currentPassword,
                newPassword
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to change password");
    }
}
