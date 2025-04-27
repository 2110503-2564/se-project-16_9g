import axios from "axios";

export default async function getUserRewards(id: string, token: string) {
    try {
        const response = await axios.get(`http://localhost:5000/api/stb/user/${id}/rewards`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch user rewards");
    }
}
