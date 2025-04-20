import axios from "axios";

export default async function viewTableStatus(resId: string, token: string) {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/stb/restaurants/${resId}/table-status`,
            {
                headers: {
                    "authorization": `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to cancel reservation");
    }
}
