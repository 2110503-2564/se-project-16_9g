import { RestaurantJson, RestaurantItem } from "../../interfaces";
import Link from "next/link";
import Card from "./Card";


export default async function RestaurantList({restaurantJson} : {restaurantJson:Promise<RestaurantJson>}) {

    const restaurantJsonReady = await restaurantJson;

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
            {
                restaurantJsonReady.data.map((resItem:RestaurantItem) => (
                    <Link href={`/restaurants/${resItem.id}?id=${resItem.id}`} key={resItem.id}>
                        <Card name={resItem.name} address={resItem.address} district={resItem.district} 
                        province={resItem.province} postalcode={resItem.postalcode} picture={resItem.picture}
                        tel={resItem.tel} region={resItem.region} opentime={resItem.opentime} 
                        closetime={resItem.closetime} reviews={resItem.reviews} reservations={resItem.reservations}
                        _id={""} id={resItem.id} __v={resItem.__v} />
                    </Link>
                ))
            }
        </div>
        </div>
    );
}