import axios from "axios";

export default async function getReservations(token: string) {
    try {
        const response = await axios.get("https://restaurant-api-fawn.vercel.app/api/stb/reservations", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch reservations");
    }
}
