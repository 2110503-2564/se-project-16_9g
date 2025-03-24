export default async function makeReservation(userid: string, partySize: number, name: string,
    contact: string, resid: string, resDate: string, resTime: string, token:string) {
    try {
        const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/restaurants/${resid}/reservations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                contact: contact,
                partySize: partySize,
                resDate: resDate,
                resTime: resTime,
                user: userid
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to make reservation");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || "Server error");
    }
}
