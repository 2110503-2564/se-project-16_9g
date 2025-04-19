'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";
import LockTableForm from "@/components/LockTableForm";

export default function Tables() {

    const { data: session } = useSession();
    if (!session) return null;

    const [restaurants, setRestaurants] = useState<{ _id: string; name: string }[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchRestaurants = async () => {
            const res = await getRestaurants();
            setRestaurants(res.data);
            console.log(res.data);
        };
        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Locked Table</h1>
            <button className="bg-green-500 text-xl text-white rounded-md px-[20px] py-3 m-5
            hover:bg-green-700 duration-300 "
            onClick={() => setShowForm(!showForm)}>Lock New Table</button>
            {showForm && (
                <div className=" flex items-center justify-center z-50 bg-black bg-opacity-40  h-screen fixed inset-0">
                    <LockTableForm restaurants={{ restaurants }} handleCancel={() => setShowForm(false)}  />
                </div>
            )}
        </div>
    )
}