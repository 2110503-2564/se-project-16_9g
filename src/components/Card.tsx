import Image from "next/image";
import { RestaurantItem } from "../../interfaces";

export default function Card(res:RestaurantItem) {
    return (
        <div className="relative w-[300px] h-[450px] bg-white rounded-lg 
        shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] m-5 px-3 py-3
        transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer" key={res.id}>
            <div className="relative h-[50%] w-full  ">
                <Image src={res.picture} alt='restaurant' width={0} height={0} sizes="100vw" 
                className="rounded-lg w-full h-full object-cover  " unoptimized={true} />
            </div>
            <div className="p-3">
                <div className="pb-3 text-sm">
                    <p className="text-lg">Name: {res.name}</p>
                    <p>Address: {res.address} {res.province} {res.postalcode} </p>
                    <p>Tel: {res.tel}</p>
                    <p>Open time: {res.opentime}</p>
                    <p>Close time: {res.closetime}</p>
                </div>
                <div className="text-center" >
                    <button className="px-4 py-2 bg-[#4AC9FF] text-white rounded-lg w-full
                    hover:bg-[#0356a3] duration-300">Reserve</button>
                </div>
            </div>
        </div>
    );
}