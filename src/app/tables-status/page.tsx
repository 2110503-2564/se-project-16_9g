'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getRestaurants from "@/libs/getRestaurants";
import LockTableForm from "@/components/LockTableForm";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Tables() {

    const router = useRouter();
    const { data: session, status } = useSession();

    // Always declare hooks before any early returns
    const [restaurants, setRestaurants] = useState<{ _id: string; name: string }[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const [reservations, setReservations] = useState([]);
    const [allreservations, setAllReservations] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        const res = await getRestaurants();
        setRestaurants(res.data);
        console.log("restaurants" , res.data);

        if (session?.user?.token) {
            const reservations = await getReservations(session.user.token);
            const filteredSorted = reservations.data
            .filter((r: any) => r.lockedByAdmin === true)
            .sort((a: any, b: any) => {
                const dateA = new Date(`${a.resDate}T${a.resStartTime}`);
                const dateB = new Date(`${b.resDate}T${b.resStartTime}`);
                return dateA.getTime() - dateB.getTime();
            });

        setAllReservations(filteredSorted);
        setReservations(filteredSorted);
        }
    };

    useEffect(() => {
        if (session?.user?.token) {
            fetchData();
        }
    }, [session?.user?.token]);

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

    const handleChange = (restaurantId: string) => {
        if (restaurantId === "all-items") {
            setSelectedRestaurant("");
            setReservations(allreservations);
        } else {
            setSelectedRestaurant(restaurantId);
            setReservations(allreservations.filter((reservation: any) => reservation.restaurant._id === restaurantId));
        }
    };

    return (
        <div className="mx-3">
            <h1 className="text-3xl font-bold text-center mt-10">Locked Table</h1>
            <button className="bg-green-500 text-xl text-white rounded-md px-[20px] py-2 m-5
            hover:bg-green-700 duration-300 "
                onClick={() => setShowForm(!showForm)}>Lock New Table</button>
            {showForm && (
                <div className=" flex items-center justify-center z-50 bg-black bg-opacity-40  h-screen fixed inset-0">
                    <LockTableForm restaurants={{ restaurants }} handleCancel={() => setShowForm(false)} onSuccess={fetchData} />
                </div>
            )}
            <hr className="mx-5 my-3 border border-slate-400" />

            <div className="flex flex-row justify-left items-center gap-5 ">
                <FormControl className="w-[50%] my-5 mx-10">
                    <label className="font-mono" id="restaurant-select">Select Restaurant</label>
                    <Select
                        labelId="restaurant-select-label"
                        id="restaurant-select"
                        value={
                            selectedRestaurant === "" ? "all-items" : selectedRestaurant
                        }
                        onChange={(e) => { console.log(e.target.value); handleChange(e.target.value) } }
                    >
                        <MenuItem value="all-items" key={"all-items"}>All Restaurants</MenuItem>
                        {restaurants.map((restaurant) => (
                            <MenuItem key={restaurant._id} value={restaurant._id}>
                                {restaurant.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
            </div>

            <div>
                {
                    reservations.map((reservation: any) => (
                        <div key={reservation._id}
                            className="relative w-[95%] m-5 px-5 bg-white rounded-lg shadow-md flex flex-row
                            p-4 mb-4 items-center gap-5 text-black " >
                            <div className="flex flex-col gap-3 py-3 justify-center items-start">
                                <div>Restaurant : {reservation.restaurant.name} </div>
                                <div className="flex flex row gap-5">
                                    <div>Locked Date : {reservation.resDate} | </div>
                                    <div>Locked Time : {reservation.resStartTime} - {reservation.resEndTime} |</div>
                                    <div>Table Size : {reservation.tableSize}</div>
                                </div>
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