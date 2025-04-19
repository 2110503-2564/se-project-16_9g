import axios from "axios";

export default async function getTableBookings() {
    try {
        const response = await axios.get(`https://restaurant-api-fawn.vercel.app/api/stb/reservations/:resId/available-tables`);
        
        return response.data;
    } catch (error) {
        throw new Error("Failed to check table");
    }
}
