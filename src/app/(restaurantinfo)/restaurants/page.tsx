import Card from "@/components/Card";
import getRestaurants from "@/libs/getRestaurants";
import RestaurantList from "@/components/RestaurantList";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Restaurants() {

    const restaurants = getRestaurants()

    return(
        <div className="flex flex-row justify-center w-full">
            <Suspense fallback={<p>Loading ...<LinearProgress/> </p>}>
                <RestaurantList restaurantJson={restaurants} />
            </Suspense>
        </div>
    );
}