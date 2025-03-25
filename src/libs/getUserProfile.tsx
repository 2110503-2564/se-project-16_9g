import axios from "axios";

export default async function getUserProfile(token: string) {
    try {
        const response = await axios.get("https://restaurant-api-fawn.vercel.app/api/stb/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error("Cannot get user profile");
    }
}
