import axios from "axios";

export default async function deleteReservation(reservationId: string, token: string) {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/stb/reservations/${reservationId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete reservation");
    }
}
