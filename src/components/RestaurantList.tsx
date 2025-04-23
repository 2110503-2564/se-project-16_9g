import { RestaurantJson, RestaurantItem } from "../../interfaces";
import Link from "next/link";
import Card from "./Card";


export default function RestaurantList({restaurantData} : {restaurantData:RestaurantItem[]}) {

    return (
        <div>
            <div className="m-[20px] p-5 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] overflow-hidden gap-5">
            {
                restaurantData.map((resItem:RestaurantItem) => (
                    <Card name={resItem.name} address={resItem.address} district={resItem.district} 
                    province={resItem.province} postalcode={resItem.postalcode} picture={resItem.picture}
                    tel={resItem.tel} region={resItem.region} opentime={resItem.opentime} 
                    closetime={resItem.closetime} reviews={resItem.reviews} reservations={resItem.reservations}
                    _id={""} id={resItem.id} __v={resItem.__v} key={resItem._id}/>
                
                ))
            }
        </div>
        </div>
    );
}