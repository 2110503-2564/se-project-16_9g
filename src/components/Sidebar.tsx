import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-[300px] mx-3 rounded-lg h-full shadow-[0px_0px_8px_4px_rgba(0,0,0,0.15)]
        absolute top-[80px] left-0 p-3 text-lg text-center">
            <div className="flex flex-col  ">
                <h1 className="bg-[#4AC9FF] py-3 my-4 rounded-lg text-white" >MENU</h1>
                <Link href={'/restaurants'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >All Restaurants</Link> <br />
                <Link href={'/addrestaurant'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >Add Restaurant</Link> <br />
                <Link href={'/myReservation'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >All Reservations</Link> <br />
            </div>
        </div>
    );
}