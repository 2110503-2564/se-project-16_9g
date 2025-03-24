export default async function addNewReview(token:string, resid:string, userid:string, rating:number, comment:string) {
    try {
        const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/restaurants/${resid}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                user: userid,
                rating: rating,
                comment: comment,
                
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to make review");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || "Server error");
    }
}
