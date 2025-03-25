import axios from "axios";

export default async function makeReservation(
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
        const response = await axios.post(
            `https://restaurant-api-fawn.vercel.app/api/stb/restaurants/${resid}/reservations`,
            {
                name,
                contact,
                partySize,
                resDate,
                resTime,
                user: userid,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        throw new Error("Failed to make reservation");
    }
}
