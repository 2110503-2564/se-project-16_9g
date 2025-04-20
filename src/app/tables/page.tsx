'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import getRestaurants from "@/libs/getRestaurants";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Tables() {

    const { data: session } = useSession();
    if (!session) return null;

    const [restaurants, setRestaurants] = useState<{ _id: string; name: string }[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

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
            <h1 className="text-3xl font-bold text-center mt-10">Table Management</h1>
            <FormControl className="w-[70%] m-10">
                <label className="font-mono" id="restaurant-select">Select Restaurant</label>
                <Select
                    labelId="restaurant-select-label"
                    id="restaurant-select"
                    value={selectedRestaurant}
                    onChange={(e) => {setSelectedRestaurant(e.target.value); console.log(e.target.value)}}
                >
                    {restaurants.map((restaurant) => (
                        <MenuItem key={restaurant._id} value={restaurant._id}>
                            {restaurant.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
        </div>
    )
}