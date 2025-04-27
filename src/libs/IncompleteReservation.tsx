import axios from "axios";

export default async function incompleteReservation(id: string, token: string) {
    try {
        const response = await axios.put(`http://localhost:5000/api/stb/reservations/incomplete/${id}`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to mark reservation as incomplete");
    }
}
