import axios from "axios";

export default async function getTableBookings(id:string) {
    try {
        const response = await axios.get(`https://localhost:5000/api/stb/restaurants/${id}/available-tables`);
        
        return response.data;
    } catch (error) {
        throw new Error("Failed to check table");
    }
}
