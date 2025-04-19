import axios from "axios";

export default async function deleteRestaurant(resId: string, token: string) {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/stb/restaurants/${resId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete restaurant");
    }
}
