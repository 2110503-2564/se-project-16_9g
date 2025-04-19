import axios from "axios";

export default async function getRestaurant(id: string) {
    try {
        const response = await axios.get(`http://localhost:5000/api/stb/restaurants/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch restaurant");
    }
}
