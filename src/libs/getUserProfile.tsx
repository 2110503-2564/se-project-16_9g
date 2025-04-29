import axios from "axios";

export default async function getUserProfile(token: string) {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

    if (!backendUrl) {
        throw new Error("BACKEND_URL is not defined in environment variables");
    }

    try {
        const response = await axios.get(`${backendUrl}/api/stb/auth/me`, {
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
