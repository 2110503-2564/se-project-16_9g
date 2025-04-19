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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Alert from "@/components/Alert";
import TableCardList from "@/components/TableCardList";
import CheckTableForm from "@/components/CheckTableForm";

export default function Reservation() {
    const params = useSearchParams();
    const res = params.get('res') || "";
    const img = params.get('img') || "";
    const userId = params.get('user') || "";
    const resName = params.get('resname');

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [duration, setDuration] = useState(1);
    const [resDate, setResDate] = useState("");
    const [resTime, setResTime] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [tableSize, setTableSize] = useState("small");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    // const [partySize, setPartySize] = useState(1);

    const [availableTables, setAvailableTables] = useState<any[]>([]);
    const [selectedTable, setSelectedTable] = useState<any | null>(null);
    const [selectedDuration, setSelectedDuration] = useState<any | null>(null);


    const { data: session } = useSession();

    const router = useRouter()

    useEffect(() => {
        const splitTimes = resTime.split(" - ");
        setStartTime(splitTimes[0]); // เวลาที่ 1 (13:00)
        setEndTime(splitTimes[1]); // เวลาที่ 2 (15:00)
    }, [resTime]);

    // //คำนวนเวลาจาจ้า เด่กๆ
    // function calculateEndTime(resDate: string, resTime: string, duration: number): string {
    //     const start = dayjs(`${resDate}T${resTime}`);
    //     const end = start.add(duration, 'hour');
    //     return end.format("HH:mm:ss"); // หรือ "HH:mm" ถ้าไม่ต้องการวินาที
    // }


    // const endTime = calculateEndTime(resDate, resTime, duration);

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

        const endhour = parseInt(resTime.split(":")[0]) + duration;
        const endTime = `${endhour.toString().padStart(2, "0")}:00`;

        try {
            const valid = validationCheck();
            if (!valid) {
                //show alert
            }
            //correct the make reservation to call the api

            const response = await makeReservation(
                userId,
                // partySize,
                name,
                tel,
                res,
                resDate,
                startTime,
                endTime,
                tableSize,
                userToken
            );

            setSuccess(true);
            setLoading(false);
            // router.push('/myReservation')
        } catch (error) {
            console.log(error);
            setError("Failed to make reservation. Please try again.");
            setLoading(false);
        }
    };

    const validationCheck = (): boolean => {
        if (!name || !tel || !duration || !resDate || !resTime) {
            setError("Please fill in all fields.");
            return false;
        }
        return true;
    };



    return (
        <div className="font-mono flex flex-col lg:flex-row justify-around items-start gap-10 px-5 py-10">
            {/* ฝั่งซ้าย - ตรวจสอบโต๊ะ */}
            <div className="w-full lg:w-[50%]">
                <div className="mb-8">
                    <CheckTableForm
                        restaurantId={res}
                        token={userToken}
                        onResult={(results, selectedDuration, selectedDate, partySize) => {
                            setAvailableTables(results);
                            setDuration(selectedDuration);
                            setResDate(selectedDate);
                            // setPartySize(partySize);
                        }}
                    />
                </div>
                <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Available Tables</h2>
                        <TableCardList
                            tables={availableTables}
                            onTableSelect={(date, time, table) => {
                                setSelectedTable({ date, time, table });
                                setResTime(time);
                                setTableSize(table);
                                console.log(table);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* ฝั่งขวา - ฟอร์มจองโต๊ะ */}

            <form
                onSubmit={handleSubmit}
                className="w-full lg:w-[500px] bg-white p-6 rounded-xl shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]"
            >
                <div className="text-2xl font-bold text-center mb-4">Make Reservation</div>

                <div className="mb-5">
                    <Image
                        src={img}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="restaurant"
                        className="w-full h-[300px] object-cover rounded-lg"
                        unoptimized
                    />
                </div>

                <div className="text-xl text-center mb-4">{resName}</div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-[70%] h-10 px-2 border-2 border-slate-300 rounded-md bg-white"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <label htmlFor="tel">Contact</label>
                        <input
                            id="tel"
                            type="text"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            placeholder="Enter your contact number"
                            className="w-[70%] h-10 px-2 border-2 border-slate-300 rounded-md bg-white"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Date</label>
                        <span className="w-[70%] mx-5">{resDate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Start Time</label>
                        <span className="w-[70%] mx-5">{resTime}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Duration</label>
                        <input
                            type="number"
                            value={duration}
                            disabled
                            className="w-[70%] h-10 px-2 border-2 border-slate-300 rounded-md bg-gray-100"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <label>Table Size</label>
                        <FormControl className="w-[70%] mx-5">
                            <input
                                type="text"
                                value={tableSize}
                                disabled
                                className="h-10 px-3 border-2 border-slate-300 rounded-md bg-gray-100 text-gray-800"
                            />
                        </FormControl>
                    </div>

                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                            <Alert
                                message="Reservation successful!"
                                resName={resName || "Unknown"}
                                name={name}
                                date={resDate}
                                time={resTime}
                                size={tableSize}
                            />
                        </div>
                    )}

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="button"
                            className="w-1/2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            onClick={() => router.push(`/restaurants/${res}`)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-sky-400 text-white px-4 py-2 rounded-md hover:bg-sky-600"
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
