'use client';
import Image from "next/image";
import { RestaurantItem } from "../../interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function Card(res: RestaurantItem) {
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (session?.user?.token) {
                try {
                    const userData = await getUserProfile(session.user.token);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [session?.user?.token]);

    if (loading) {
        return (
            <div className="w-full text-center">
                <p>Loading...</p>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="relative w-[300px] h-[450px] bg-white rounded-lg 
        shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] m-5 px-3 py-3
        transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
            key={res.id}
            onClick={() => router.push(`/restaurants/${res.id}?id=${res.id}`)}
        >
            <div className="relative h-[50%] w-full">
                <Image
                    src={res.picture}
                    alt="restaurant"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-full h-full object-cover"
                    unoptimized
                />
            </div>
            <div className="p-3">
                <div className="pb-3 text-sm">
                    <p className="text-lg">Name: {res.name}</p>
                    <p>Address: {res.address} {res.province} {res.postalcode}</p>
                    <p>Tel: {res.tel}</p>
                    <p>Open time: {res.opentime}</p>
                    <p>Close time: {res.closetime}</p>
                </div>
                <div className="text-center">
                    {user ? (
                        <button
                            className="px-4 py-2 bg-[#4AC9FF] text-white 
                            rounded-lg w-full hover:bg-[#0356a3] duration-300"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents card click from triggering
                                router.push(`/reservations?res=${res.id}&resname=${res.name}&img=${res.picture}&user=${user.data._id}`);
                            }}
                        >
                            Reserve
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-[#4AC9FF] text-white 
                            rounded-lg w-full hover:bg-[#0356a3] duration-300"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents card click from triggering
                                router.push(`/login`);
                            }}>
                            Login to Reserve
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
