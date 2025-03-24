export default async function getUserProfile(token:string) {
    const response = await fetch("https://restaurant-api-fawn.vercel.app//api/stb/auth/me", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Cannot get user profile")
    }

    return response.json();
}