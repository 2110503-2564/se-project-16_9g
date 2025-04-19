import axios from "axios";

export default async function editReservation(
    userid: string,
    partySize: number,
    name: string,
    contact: string,
    resid: string,
    resDate: string,
    resTime: string,
    token: string
) {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/stb/reservations/${resid}`,
            {
                name: name,
                contact: contact,
                partySize: partySize,
                resDate: resDate,
                resTime: resTime,
                user: userid
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update reservation");
    }
}
