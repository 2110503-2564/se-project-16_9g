export default async function getReservation(id:string, token:string) {

    const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/reservations/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch reservation")
    }
    return await response.json();
}