'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import viewTableStatus from "@/libs/viewTableStatus";

export default function Tables() {

    const { data: session, status } = useSession();

    const [restaurants, setRestaurants] = useState<{ _id: string; name: string }[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const [tableStatus, setTableStatus] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            if (!session?.user?.token) return;

            try {
                const res = await getRestaurants();
                setRestaurants(res.data);
                console.log("Fetched restaurants:", res.data);
            } catch (err) {
                console.error("Failed to fetch restaurants:", err);
            }
        }
        fetchRestaurants();
    }, [session?.user?.token]);

    if (status === "loading") { return <div className="w-full text-center">Loading...</div>; }


    const handleSubmit = async (restaurantId: string) => {
        setSelectedRestaurant(restaurantId);
        try {
            const response = await viewTableStatus(restaurantId, session?.user?.token ?? "");
            setTableStatus(response.data);
            console.log("Fetched table status:", response.data);
        } catch (error) {
            console.error("Error fetching table status:", error);
        }
    };

    return (
        <div>
            <div className="flex flex-col mx-10  h-screen">
                <h1 className="text-3xl font-bold text-center mt-10 pb-5">Table Management</h1>
                <div className="flex flex-row justify-left items-center gap-5  ">
                    <FormControl className="w-[50%] m-10">
                        <label className="font-mono" id="restaurant-select">Select Restaurant</label>
                        <Select
                            labelId="restaurant-select-label"
                            id="restaurant-select"
                            value={selectedRestaurant}
                            onChange={(e) => { setSelectedRestaurant(e.target.value); console.log(selectedRestaurant) }}
                        >
                            {restaurants.map((restaurant) => (
                                <MenuItem key={restaurant._id} value={restaurant._id}>
                                    {restaurant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <button className="px-10 py-3 rounded-md bg-green-500 text-white mt-5 "
                        onClick={() => handleSubmit(selectedRestaurant)}>View</button>
                </div>
                {
                    tableStatus.length > 0 && (
                        <div className="flex flex-col items-center justify-center w-full h-auto bg-white rounded-lg 
                            shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] mx-2  px-2 pt-3">
                            {tableStatus.map((table: any) => (
                                <div key={table._id} className="w-full bg-white rounded-lg shadow-md flex flex-row
                                    mb-4  justify-between px-10 py-5 text-black text-center" >
                                    <div>
                                        <div>Date</div>
                                        <div>{table.date}</div>
                                    </div>
                                    <div>
                                        <div>Time</div>
                                        <div>{table.time}</div>
                                    </div>
                                    <div>
                                        <div>Table Size</div>
                                        <div>Small</div>
                                        <div>Medium</div>
                                        <div>Large</div>
                                    </div>
                                    <div>
                                        <div>Unavailable</div>
                                        <div>{table.tables.small.unavailable}</div>
                                        <div>{table.tables.medium.unavailable}</div>
                                        <div>{table.tables.large.unavailable}</div>
                                    </div>
                                    <div>
                                        <div>Available</div>
                                        <div>{table.tables.small.available}</div>
                                        <div>{table.tables.medium.available}</div>
                                        <div>{table.tables.large.available}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}