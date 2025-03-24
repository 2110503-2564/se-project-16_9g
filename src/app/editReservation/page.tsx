import Image from "next/image";
import DateReserve from "@/components/DateReserve";
import TimeReserve from "@/components/TimeReserve";

export default function EditReservation() {
    return (
        <div className="flex flex-col items-center my-10">
            <form action="#" className="w-[500px] h-auto p-5
            flex flex-col items-center rounded-xl shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]">
                <div className="text-2xl">Make Reservation</div>
                <div className="my-5 ">
                    <Image src={'/img/cover.jpg'} width={0} height={0} sizes="100vw" alt="restaurant"
                    className=" w-[80%] h-auto m-auto rounded-lg"/>
                </div>
                <div className="text-xl">Restaurant Name</div>
                <div className=" w-[95%]">
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name"
                        className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none
                        "/>
                    </div >
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label htmlFor="tel">Contact</label>
                        <input type="text" name="tel" id="tel" placeholder="Enter your contact number"
                        className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none"/>
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label htmlFor="party-size">Number of <br /> People</label>
                        <input type="number" name="party-size" id="party-size" placeholder="Enter number of people"
                        className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none" min={1}/>
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center ">
                        <label>Date</label>
                        <div className="w-[70%] mx-5">
                            <DateReserve /> 
                        </div>
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center ">
                        <label>Time</label>
                        <div className="w-[70%] mx-5">
                            <TimeReserve /> 
                        </div>
                    </div>
                    <div className="mt-5 text-center ">
                        <button className="bg-[#4AC9FF] w-[50%] text-white px-10 py-2 rounded-md
                        hover:bg-[#0356a3] duration-300">Edit Reservation</button>
                    </div>
                </div>
            </form>
        </div>
    );
}