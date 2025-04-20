'use client'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react"
import { Dayjs } from "dayjs"

export default function TimeReserve({onTimeChange, initialTime} : {onTimeChange:Function, initialTime:Dayjs}) {
    const [reserveTime, setReserveTime] = useState<Dayjs|null>(initialTime);
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker className="w-full bg-white" 
                defaultValue={initialTime}
                value={reserveTime} 
                onChange={(value) => {setReserveTime(value); onTimeChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}