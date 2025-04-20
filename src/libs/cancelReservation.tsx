import axios from "axios";

export default async function cancelReservation(reservationId: string, token: string) {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/stb/reservations/cancel/${reservationId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to cancel reservation");
    }
}
