"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function DateReserve() {
    return(
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-full " />
            </LocalizationProvider>

        </div>
    );
}