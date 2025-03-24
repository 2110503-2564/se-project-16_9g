'use client'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react"
import { Dayjs } from "dayjs"

export default function TimeReserve({onTimeChange} : {onTimeChange:Function}) {
    const [reserveTime, setReserveTime] = useState<Dayjs|null>(null);
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker className="w-full" 
                value={reserveTime} 
                onChange={(value) => {setReserveTime(value); onTimeChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}