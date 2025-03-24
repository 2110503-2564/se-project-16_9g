export default async function getRestaurants(id:string) {

    const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/restaurants/${id}`);
    if(!response.ok) {
        throw new Error("Failed to fetch restaurant")
    }
    return await response.json();
}