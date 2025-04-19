'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";
import LockTableForm from "@/components/LockTableForm";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";

export default function Tables() {

    const router = useRouter();

    const { data: session } = useSession();
    if (!session) return null;

    const [restaurants, setRestaurants] = useState<{ _id: string; name: string }[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    const [reservations, setReservations] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        const res = await getRestaurants();
        setRestaurants(res.data);
        console.log(res.data);

        const reservations = await getReservations(session.user.token);
        setReservations(reservations.data.filter((reservation: any) => reservation.lockedByAdmin === true));
        
    };

    useEffect(() => {
        fetchData();
    }, [session.user.token]);

    console.log(reservations);

    const handleUnlock = async (reservationId: string) => {
        if (!session?.user?.token) return;

        const confirmUnlock = window.confirm("Are you sure you want to unlock this table?");
        if (!confirmUnlock) return;

        try {
            await deleteReservation(reservationId, session.user.token);
            alert("Table unlocked successfully!");

            await fetchData(); 
        } catch (error: any) {
            alert("Failed to unlock table: " + error.message);
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-10">Locked Table</h1>
            <button className="bg-green-500 text-xl text-white rounded-md px-[20px] py-3 m-5
            hover:bg-green-700 duration-300 "
            onClick={() => setShowForm(!showForm)}>Lock New Table</button>
            {showForm && (
                <div className=" flex items-center justify-center z-50 bg-black bg-opacity-40  h-screen fixed inset-0">
                    <LockTableForm restaurants={{ restaurants }} handleCancel={() => setShowForm(false)} onSuccess={fetchData}  />
                </div>
            )}

            <div>
                {
                    reservations.map((reservation: any) => (
                        <div key={reservation._id}
                            className="relative w-[95%] mx-5 px-5 bg-white rounded-lg shadow-md flex flex-row
                            p-4 mb-4 items-center gap-5 text-black " >
                                <div className="flex flex-row gap-3 items-center justify-between py-3 ">
                                    <div>Restaurant : {reservation.restaurant.name} | </div>
                                    <div>Locked Date : {reservation.resDate} | </div>
                                    <div>Locked Time : {reservation.resStartTime} - {reservation.resEndTime} |</div>
                                    <div>Table Size : {reservation.tableSize}</div>
                                    <button className="bg-red-500 text-md text-white px-5 py-2 rounded-md ml-20
                                    hover:bg-red-700 duration-300 absolute right-5"
                                    onClick={() => handleUnlock(reservation._id)}>Unlock</button>
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}