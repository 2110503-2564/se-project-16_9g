export default async function deleteReservation(reservationId:string, token:string) {
    try {
        const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/reservations/${reservationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok  ) {
            throw new Error("Failed to make reservation");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || "Server error");
    }
}
