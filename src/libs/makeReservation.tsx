import axios from "axios";

export default async function makeReservation(
    userid: string,
    // partySize: number,
    name: string,
    contact: string,
    resid: string,
    resDate: string,
    resStartTime: string,
    resEndTime: string,
    tableSize: string,
    token: string
) {
    try {
        const response = await axios.post(
            `http://localhost:5000/api/stb/restaurants/${resid}/reservations`,
            {
                name,
                contact,
                // partySize,
                resDate,
                resStartTime,
                resEndTime,
                tableSize,
                user: userid,
                restaurant: resid,
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
        console.log(error);
        throw new Error("Failed to make reservation");
    }
}
