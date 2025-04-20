"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"

export default function DateReserve({onDateChange, initialDate} : {onDateChange:Function, initialDate:Dayjs}) {
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(initialDate);
    return(
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-full "
                defaultValue={initialDate}
                value={reserveDate} 
                onChange={(value) => {setReserveDate(value); onDateChange(value)}} />
            </LocalizationProvider>

        </div>
    );
}