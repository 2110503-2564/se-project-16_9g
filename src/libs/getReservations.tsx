export default async function getReservations(token:string) {

    const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/reservations`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`
        },
        
    });
    if(!response.ok) {
        throw new Error("Failed to fetch reservations")
    }
    return await response.json();
}