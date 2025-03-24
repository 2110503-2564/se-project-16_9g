'use client'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers";

export default function TimeReserve() {
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker className="w-full" />
            </LocalizationProvider>
        </div>
    );
}