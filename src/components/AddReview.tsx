'use client'
import { Rating } from "@mui/material";
import { useState } from "react";
import addNewReview from "@/libs/addNewReview";
import { useRouter } from "next/navigation";

export default function AddReview({ resName, rid, uid, token }: 
    { resName: string, rid:string, uid:string, token:string }) {

    const router = useRouter();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number | null>(5);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        if (!token) {
            setError("User not authenticated. Please login.");
            setLoading(false);
            return;
        }

        try {
            if (!rating || !comment) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            const response = await addNewReview(token, rid, uid, rating, comment);
            setSuccess(true);
            setLoading(false);
            
            alert("Add new review successfully!");
        router.push(`/restaurants/${rid}`);
        } catch (error) {
            setError("Failed to make review. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="w-[500px] h-[500px] shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] rounded-xl m-5
        flex flex-col items-center py-3 px-8">
            <div className="p-3 text-2xl">{resName}</div>
            <div className="w-full h-[50%] mb-8" >
                <textarea name="review-comment" id="review-comment"
                    value={comment} onChange={e => setComment(e.target.value)}
                    placeholder="How about this restaurant"
                    className="border border-2 border-[#4AC9FF] rounded-lg w-full h-full p-3 
                focus:outline-none text-lg"></textarea>
            </div>
            <div>
                <Rating name="size-large" value={rating} onChange={(e, val) => setRating(val)}
                    className="text-[40px] space-x-3" />
            </div>
            {error && <div className="text-red-500 text-sm my-3">{error}</div>}
            <form className="w-full flex flex-row justify-around my-8" onSubmit={handleSubmit}>
                <button type="button" onClick={() => router.push(`/restaurant/${rid}`)} className="w-[45%] bg-[#4AC9FF] py-2 rounded-lg text-white 
                hover:bg-[#0356a3] duration-300">Cancel</button>
                <button type="submit" className="w-[45%] bg-[#4AC9FF] py-2 rounded-lg text-white
                hover:bg-[#0356a3] duration-300">Add Review</button>
            </form>
        </div>
    );
}
