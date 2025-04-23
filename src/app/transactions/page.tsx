'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function Transactions() {

    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);

    const fetchData = async () => {
        if (session?.user?.token) {
            const profile = await getUserProfile(session.user.token);
            setProfile(profile.data);
            if (profile.data.role !== "admin") {
                alert("You are not authorized to view this page.");
                return;
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">Point Transaction Histories</h1>
            <div className="flex flex-row gap-10 justify-center mt-10 px-10 py-8 bg-white rounded-lg 
            shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] w-[80%] mx-auto  ">
                <div className="flex flex-col gap-3 ">
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label htmlFor="">User ID</label>
                        <input type="text" className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="User ID" />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label htmlFor="">Username</label>
                        {/* dropdown */}
                        <input type="text" className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="Username" />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label htmlFor="">Date</label>
                        {/* datepicker */}
                        <input type="text" className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="User ID" />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label htmlFor="">Restaurant</label>
                        {/* dropdown */}
                        <input type="text" className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="User ID" />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label htmlFor="">Status</label>
                        {/* dropdown */}
                        <input type="text" className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="User ID" />
                    </div>
                </div>
                <div>
                    <button className="px-5 py-2 bg-[#4AC9FF] text-white rounded-md hover:bg-[#0356a3] duration-300">
                        Search
                    </button>
                </div>
            </div>

            <div>
                <div className="relative flex flex-col gap-3 justify-between mt-10 px-10 py-8 bg-white rounded-lg 
                w-fit mx-auto w-[80%] border-2 border-red-500 " >
                    <div className="absolute right-0 top-0 px-[30px] py-2 bg-red-500 rounded-tr-md 
                    text-white">Redeem</div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>Transaction ID</div>
                        <div>Date</div>
                    </div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>User ID</div>
                        <div>Username</div>
                        <div>Tel</div>
                    </div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>Restaurant Name</div>
                    </div>
                </div>
                <div className="relative flex flex-col gap-3 justify-between mt-10 px-10 py-8 bg-white rounded-lg 
                w-fit mx-auto w-[80%] border-2 border-green-500 " >
                    <div className="absolute right-0 top-0 px-[30px] py-2 bg-green-500 rounded-tr-md 
                    text-white">Receive</div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>Transaction ID</div>
                        <div>Date</div>
                    </div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>User ID</div>
                        <div>Username</div>
                        <div>Tel</div>
                    </div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>Restaurant Name</div>
                    </div>
                </div>
                <div className="relative flex flex-col gap-3 justify-between my-10 px-10 py-8 bg-white rounded-lg 
                w-fit mx-auto w-[80%] border-2 border-green-500  " >
                    <div className="absolute right-0 top-0 px-[30px] py-2 bg-green-500 rounded-tr-md 
                    text-white">Receive</div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>Transaction ID</div>
                        <div>Date</div>
                    </div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>User ID</div>
                        <div>Username</div>
                        <div>Tel</div>
                    </div>
                    <div className="flex flex-row gap-3 items-start ">
                        <div>Restaurant Name</div>
                    </div>
                </div>
            </div>
        </div>
    )
}