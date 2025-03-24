'use client'
import Image from "next/image";
import Review from "@/components/Review";
import getRestaurant from "@/libs/getRestaurant";
import { ReviewItem } from "../../../../../interfaces";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LinearProgress } from "@mui/material";

export default function InfoPage({ params }: { params: { rid: string } }) {

    const [res, setRes] = useState<any | null>(null); 
    const id = params.rid;

    useEffect(() => {
        const fetchData = async () => {
            const res = await getRestaurant(id);
            setRes(res); 
        }
        fetchData();
    }, [id]);

    if (!res) {
        return <div className="w-full text-center" >{<p>Loading ...<LinearProgress/> </p>}</div>
    }

    return (
        <div>
            <div className="text-center text-3xl py-10">{res.data.name}</div>
            <div className="flex flex-row justify-center items-center gap-[70px]">
                <div>
                    <Image
                        src={res.data.picture}  
                        alt="restaurant"
                        width={400} 
                        height={300}  
                        className="rounded-lg w-[400px] h-auto"
                        unoptimized={true}
                    />
                </div>
                <div>
                    <div className="text-lg">
                        <p>Address: {res.data.address} {res.data.province} {res.data.postalcode}</p>
                        <p>Tel: {res.data.tel}</p>
                        <p>Open time: {res.data.opentime}</p>
                        <p>Close time: {res.data.closetime}</p>
                    </div>
                    <div className="my-3">
                        <Link href={'/reservations'} className="bg-[#4AC9FF] text-white 
                        px-3 py-2 rounded-md hover:bg-[#0356a3] duration-300 mr-3">
                        Reserve</Link>
                        <button className="bg-[#4AC9FF] text-white px-3 py-2 rounded-md
                        hover:bg-[#0356a3] duration-300">Review this Restaurant</button>
                    </div>
                </div>
            </div>

            {
                res.data.reviews.length !== 0 ? 
                <div className="text-center my-10 ">
                    <div className="text-3xl ">Reviews & Rating</div>
                    <div className="flex flex-row justify-center">
                        {
                            res.data.reviews.map((review:ReviewItem) => (
                                <Review rating={review.rating} comment={review.comment} />
                            ))
                        }
                    </div>
                </div>
                : "NO REVIEW"

            }
        </div>
    );
}
