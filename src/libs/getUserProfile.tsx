import axios from "axios";

export default async function getUserProfile(token: string) {
    
    try {
        const response = await axios.get("http://localhost:5000/api/stb/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("getUserProfile error:", error);
        throw new Error("Cannot get user profile");
    }
}
