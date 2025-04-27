'use client'
import DateReserve from "./DateReserve";
import TimeReserve from "./TimeReserve";
import { useState, useEffect } from "react";
import { duration, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import makeReservation from "@/libs/makeReservation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RestaurantsProps {
    restaurants: { _id: string; name: string }[];
}

export default function LockTableForm({ restaurants, handleCancel, onSuccess }: {
    restaurants: RestaurantsProps,
    handleCancel: Function,
    onSuccess: Function
}) {

    const { data: session } = useSession();
    const router = useRouter();

    const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
    const [date, setDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
    const [startTime, setStartTime] = useState<string>(dayjs().format("HH:mm"));
    const [endTime, setEndTime] = useState<string>(dayjs().format("HH:mm"));
    const [tableSize, setTableSize] = useState<string>("small");
    const [duration, setDuration] = useState<number>(1);

    const [error, setError] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [userToken, setUserToken] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedRestaurant || !date || !startTime || !endTime || !tableSize) {
            setError("Please fill in all fields.");
            return;
        }
        if (dayjs(date).isBefore(dayjs(), "day")) {
            setError("Date cannot be in the past.");
            return;
        }

        console.log("Form submitted with values: ", {
            selectedRestaurant,
            date,
            startTime,
            endTime,
            tableSize,
            duration,
            userId
        });

        try {
            const response = await makeReservation(userId, "admin", "-", selectedRestaurant, date, startTime, endTime, tableSize, true, userToken);
            setSuccess(true);
            setLoading(false);
            alert("Locked new table successfully!");
            handleCancel();
            onSuccess();
        } catch (error) {
            setError("Failed to make reservation. Please try again.");
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (session?.user?.token) {
                try {
                    setUserId(session.user._id);
                    setUserToken(session.user.token);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUserProfile();
    }, [session?.user?.token]);


    return (
        <div className="flex flex-col items-center justify-center w-[500px] border-2 border-slate-300 
        rounded-md p-4 bg-white shadow-lg ">
            <h1 className="text-3xl font-bold text-center mt-10">Lock Table</h1>
            <div className="flex flex-col w-full my-5 ">
                <div>
                    <FormControl className="w-full p-3 flex flex-row justify-between items-center">
                        <label className="font-mono" id="restaurant-select">Select Restaurant</label>
                        <Select
                            labelId="restaurant-lock-select-label"
                            id="restaurant-lock-select"
                            value={selectedRestaurant}
                            className="w-full"
                            onChange={(e) => { setSelectedRestaurant(e.target.value); console.log(e.target.value) }}
                        >
                            {restaurants.restaurants.map((restaurant) => (
                                <MenuItem key={restaurant._id} value={restaurant._id}>
                                    {restaurant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-full p-3 flex flex-row justify-between items-center">
                    <label>Date</label>
                    <div className="w-[70%] mx-5">
                        <DateReserve initialDate={dayjs()}
                            onDateChange={(value: Dayjs) => { setDate(dayjs(value).format("YYYY-MM-DD")) }} />
                    </div>
                </div>
                <div className="w-full  p-3 flex flex-row justify-between items-center">
                    <label>Start Time</label>
                    <div className="w-[70%] mx-5">
                        <TimeReserve initialTime={dayjs()} onTimeChange={(value: Dayjs) => { setStartTime(dayjs(value).format("HH:mm")) }} />
                    </div>
                </div>
                <div className="w-full  p-3 flex flex-row justify-between items-center">
                    <label>End Time</label>
                    <div className="w-[70%] mx-5">
                        <TimeReserve initialTime={dayjs()} onTimeChange={(value: Dayjs) => { setEndTime(dayjs(value).format("HH:mm")) }} />
                    </div>
                </div>
                <div className="w-full p-3 flex flex-row justify-between items-center">
                    <label>Table Size</label>
                    <FormControl className="w-[70%] mx-5">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tableSize}
                            onChange={(e) => setTableSize(e.target.value)}
                        >
                            <MenuItem value="small">Small (1-4)</MenuItem>
                            <MenuItem value="medium">Medium (5-9)</MenuItem>
                            <MenuItem value="large">Large (10++)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {error && <div className="text-red-500 text-sm my-3">{error}</div>}
                <div className="flex flex-row justify-center my-3 gap-3">
                    <button className="py-3 px-10 bg-slate-400 rounded-md text-lg text-white
                    hover:bg-slate-600 duration-300 "
                        onClick={() => handleCancel()}>Cancel</button>
                    <button onClick={(e) => handleSubmit(e)} type="submit" className="py-3 px-10 bg-yellow-400 rounded-md text-white text-lg
                    hover:bg-yellow-600 duration-300">Lock Table</button>
                </div>

            </div>
        </div>
    );
}