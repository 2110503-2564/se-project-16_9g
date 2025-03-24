export default async function getRestaurants() {

    const response = await fetch("https://restaurant-api-fawn.vercel.app/api/stb/restaurants");
    if(!response.ok) {
        throw new Error("Failed to fetch restaurants")
    }
    return await response.json();
}