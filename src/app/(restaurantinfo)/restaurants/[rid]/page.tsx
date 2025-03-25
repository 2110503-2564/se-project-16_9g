'use client'
import Image from "next/image";
import Review from "@/components/Review";
import getRestaurant from "@/libs/getRestaurant";
import { ReviewItem } from "../../../../../interfaces";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LinearProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function InfoPage({ params }: { params: { rid: string } }) {

    const [res, setRes] = useState<any | null>(null);
    const id = params.rid;
    const { data: session } = useSession();
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);  

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Set loading to true when fetching data

            try {
                const resData = await getRestaurant(id);
                setRes(resData);

                if (session?.user?.token) {
                    const userData = await getUserProfile(session.user.token);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [id, session?.user.token]);

    if (loading) {
        return (
            <div className="w-full text-center">
                <p>Loading...</p>
                <LinearProgress />
            </div>
        );
    }

    if (!res) {
        return <div className="w-full text-center">Error: Unable to load restaurant data</div>;
    }

    return (
        <div>
            <div className="flex flex-row justify-center m-10 items-center gap-[70px]">
                <div>
                    <Image
                        src={res.data.picture}
                        alt="restaurant"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="rounded-lg w-[350px] h-auto"
                        unoptimized={true}
                    />
                </div>
                <div>
                    <div className="text-lg">
                        <div className="text-3xl py-8 font-mono">{res.data.name}</div>
                            <p className="py-2">Address: {res.data.address} {res.data.province} {res.data.postalcode}</p>
                            <p className="py-2">Tel: {res.data.tel}</p>
                            <p className="py-2">Open time: {res.data.opentime}</p>
                            <p className="py-2">Close time: {res.data.closetime}</p>
                        </div>
                    <div className="my-5">
                        {user ? (
                            <Link href={`/reservations?res=${res.data.id}&resname=${res.data.name}&img=${res.data.picture}&user=${user.data._id}`} 
                            className="px-8 py-3 bg-[#4AC9FF] text-white 
                        rounded-lg w-full hover:bg-[#0356a3] duration-300 mr-3">
                                Reserve
                            </Link>
                        ) : (
                            <Link href="/login" className="px-4 py-3 bg-[#4AC9FF] text-white 
                        rounded-lg w-full hover:bg-[#0356a3] duration-300 mr-3">
                                Login to Reserve
                            </Link>
                        )}
                        {
                            user ? (
                                <Link href={`/restaurants/${res.data.id}/review`} className="bg-[#4AC9FF] 
                                text-white px-3 py-2 rounded-md
                                hover:bg-[#0356a3] duration-300">Review this Restaurant</Link>
                            ) : (
                                <Link href={'/api/auth/signin'} className="bg-[#4AC9FF] text-white px-3 py-3 mx-3 rounded-md
                                hover:bg-[#0356a3] duration-300">LogIn to Review this Restaurant</Link>
                            )
                        }
                    </div>
                </div>
            </div>

            {res.data.reviews.length !== 0 ? (
                <div className="text-center my-10 ">
                    <div className="text-3xl py-3 ">Reviews & Rating</div>
                    <div className="flex flex-row justify-center" >
                        {res.data.reviews.map((review: ReviewItem) => (
                            <Review rating={review.rating} comment={review.comment} key={review._id} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-2xl text-center p-10 ">NO REVIEW</div>
            )}
        </div>
    );
}
