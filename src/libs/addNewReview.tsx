import axios from "axios";

export default async function addNewReview(
    token: string, 
    resid: string, 
    userid: string, 
    rating: number, 
    comment: string
) {
    try {
        const response = await axios.post(
            `https://restaurant-api-fawn.vercel.app/api/stb/restaurants/${resid}/reviews`,
            {
                user: userid,
                rating: rating,
                comment: comment,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to add review");
    }
}
