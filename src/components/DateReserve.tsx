"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react"
import { Dayjs } from "dayjs"

export default function DateReserve({onDateChange} : {onDateChange:Function}) {
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null);
    return(
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-full "
                value={reserveDate} 
                onChange={(value) => {setReserveDate(value); onDateChange(value)}} />
            </LocalizationProvider>

        </div>
    );
}