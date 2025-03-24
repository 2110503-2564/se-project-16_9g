import { Rating } from "@mui/material";

export default function AddReview() {
    return (
        <div className="w-[500px] h-[500px] border border-4 border-[#4AC9FF] rounded-xl m-5
        flex flex-col items-center  p-10">
            <div className="w-full h-[50%] mb-8" >
                <textarea name="review-comment" id="review-comment" 
                placeholder="How about this restaurant"
                className="border border-2 border-[#4AC9FF] rounded-lg w-full h-full p-3 
                focus:outline-none text-lg"></textarea>
            </div>
            <div>
                <Rating name="size-large" defaultValue={5} className="text-[40px] space-x-3" />
            </div>
            <form className="w-full flex flex-row justify-around my-8">
                <button className="w-[45%] bg-[#4AC9FF] py-2 rounded-lg text-white 
                hover:bg-[#0356a3] duration-300">Cancel</button>
                <button className="w-[45%] bg-[#4AC9FF] py-2 rounded-lg text-white
                hover:bg-[#0356a3] duration-300">Add Review</button>
            </form>
        </div>
    );
}