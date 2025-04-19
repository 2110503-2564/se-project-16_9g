import axios from "axios";

export default async function makeReservation(
    userid: string,
    name: string,
    contact: string,
    resid: string,
    resDate: string,
    resStartTime: string,
    resEndTime: string,
    tableSize: string,
    lockedByAdmin: boolean,
    token: string,
) {
    try {
        const response = await axios.post(
            `http://localhost:5000/api/stb/restaurants/${resid}/reservations`,
            {
                name,
                contact,
                resDate,
                resStartTime,
                resEndTime,
                tableSize,
                user: userid,
                lockedByAdmin
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
