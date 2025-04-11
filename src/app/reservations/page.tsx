'use client'
import Image from "next/image";
import DateReserve from "@/components/DateReserve";
import TimeReserve from "@/components/TimeReserve";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import makeReservation from "@/libs/makeReservation";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for session management
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";

export default function Reservation() {
    const params = useSearchParams();
    const res = params.get('res') || "";
    const img = params.get('img') || "";
    const userId = params.get('user') || "";
    const resName = params.get('resname');

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [partySize, setPartySize] = useState(1);
    const [resDate, setResDate] = useState("");
    const [resTime, setResTime] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userToken, setUserToken] = useState(""); 

    const { data: session } = useSession(); 

    const router = useRouter()

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (session?.user?.token) {
                try {
                    setUserToken(session.user.token);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [session?.user?.token]); 


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        if (!userToken) {
            setError("User not authenticated. Please login.");
            setLoading(false);
            return;
        }

        try {
            if (!name || !tel || !partySize || !resDate || !resTime) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            const response = await makeReservation(userId, partySize, name, tel, res, resDate, resTime, userToken);
            setSuccess(true);
            setLoading(false);
            router.push('/myReservation')
        } catch (error) {
            setError("Failed to make reservation. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="font-mono flex flex-col items-center my-10">
            <form onSubmit={handleSubmit} className="w-[500px] h-auto p-5 flex flex-col items-center rounded-xl shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]">
                <div className="text-2xl">Make Reservation</div>
                <div className="my-5">
                    <Image src={img} width={0} height={0} sizes="100vw" alt="restaurant" className="w-auto h-[300px] m-auto rounded-lg" unoptimized />
                </div>
                <div className="text-xl">{resName}</div>
                <div className="w-[95%]">
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none bg-white"
                        />
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label htmlFor="tel">Contact</label>
                        <input
                            type="text"
                            name="tel"
                            id="tel"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            placeholder="Enter your contact number"
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none bg-white"
                        />
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label htmlFor="party-size">Number of <br /> People</label>
                        <input
                            type="number"
                            name="party-size"
                            id="party-size"
                            value={partySize}
                            onChange={(e) => setPartySize(Number(e.target.value))}
                            placeholder="Enter number of people"
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none bg-white"
                            min={1}
                        />
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label>Date</label>
                        <div className="w-[70%] mx-5">
                            <DateReserve initialDate={dayjs()}
                            onDateChange={(value: Dayjs) => { setResDate(dayjs(value).format("YYYY-MM-DD")) }} />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center">
                        <label>Time</label>
                        <div className="w-[70%] mx-5">
                            <TimeReserve initialTime={dayjs()} onTimeChange={(value: Dayjs) => { setResTime(dayjs(value).format("HH:mm:ss")) }} />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm my-3">{error}</div>}
                    {success && <div className="text-green-500 text-sm my-3">Reservation successful!</div>}
                    <div className="mt-5 text-center flex flex-row gap-2">
                        <button className="bg-[#4AC9FF] w-[50%] text-white px-10 py-2 rounded-md hover:bg-[#0356a3] duration-300"
                        onClick={() => router.push(`/restaurants/${res}`)}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#4AC9FF] w-[50%] text-white px-10 py-2 rounded-md hover:bg-[#0356a3] duration-300"
                            disabled={loading}
                        >
                            {loading ? "Reserving..." : "Reserve"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
