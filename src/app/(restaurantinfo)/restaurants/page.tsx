"use client"; // Ensure it runs in the client-side
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import getRestaurants from "@/libs/getRestaurants";
import RestaurantList from "@/components/RestaurantList";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);

    // Fetch restaurants from API
    const fetchRestaurants = async () => {
        try {
            const data = await getRestaurants();
            setRestaurants(data.data); // Update state with new data
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    // Load restaurants on component mount
    useEffect(() => {
        fetchRestaurants();
    }, []);


    return (
        <div className=" w-full font-mono text-black ">
            <Suspense fallback={<div>Loading ...<LinearProgress  /> </div>}>
                <RestaurantList restaurantData={restaurants} />
            </Suspense>
        </div>
    );
}
