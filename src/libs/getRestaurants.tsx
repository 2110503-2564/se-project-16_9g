import axios from 'axios';

export default async function getRestaurants() {
    try {
        const response = await axios.get("http://localhost:5000/api/stb/restaurants");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch restaurants");
    }
}
