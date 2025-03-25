import axios from "axios";

export default async function getReservation(id: string, token: string) {
    try {
        const response = await axios.get(`https://restaurant-api-fawn.vercel.app/api/stb/reservations/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch reservation");
    }
}
