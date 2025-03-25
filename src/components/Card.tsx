'use client';
import Image from "next/image";
import { RestaurantItem } from "../../interfaces";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import { useRouter } from "next/navigation";
import { LinearProgress } from "@mui/material";
import deleteRestaurant from "@/libs/deleteRestaurant";

export default function Card(res: RestaurantItem) {
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleDeleteRestaurant = async (resid: string) => {
        if (!session?.user?.token) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
        if (!confirmDelete) return;

        try {
            await deleteRestaurant(resid, session.user.token);
            alert("Restaurant deleted successfully!");
            router.push('/restaurants')

        } catch (error: any) {
            alert("Failed to delete restaurant: " + error.message);
        }
    };

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
    }, []);

    if (loading) {
        return (
            <div className="w-screen text-center">
                <LinearProgress />
            </div>
        );
    }

    const role = user.data.role || "";
    return (
        <div className="relative flex flex-col items-center w-[300px] h-auto bg-white rounded-lg 
        shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] m-5 px-2 pt-3
        transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
            key={res.id}
            onClick={() => router.push(`/restaurants/${res.id}?id=${res.id}`)}
        >
            <div className=" h-[200px] w-full ">
                <Image
                    src={res.picture}
                    alt="restaurant"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-full h-full object-cover"
                    unoptimized
                />
            </div>
            <div className="p-3">
                <div className="pb-10 text-sm my-5">
                    <p className="text-lg">Name: {res.name}</p>
                    <p>Address: {res.address} {res.province} {res.postalcode}</p>
                </div>
                <div className="text-center flex flex-row gap-2 absolute bottom-0 my-2">
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
                    {
                        role === 'admin' ? (
                            <button
                                className="px-4 py-2 bg-yellow-400 text-white 
                            rounded-lg w-full hover:bg-yellow-600 duration-300"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/restaurants/${res.id}/edit?id=${res.id}`);
                                }}
                            >
                                Edit
                            </button>
                        ) : null
                    }
                    {
                        role === 'admin' ? (
                            <button
                                className="px-4 py-2 bg-red-500 text-white 
                            rounded-lg w-full hover:bg-red-700 duration-300"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents card click from triggering
                                    handleDeleteRestaurant(res.id);
                                    router.refresh()
                                }}
                            >
                                Delete
                            </button>
                        ) : null
                    }

                </div>
            </div>
        </div>
    );
}
