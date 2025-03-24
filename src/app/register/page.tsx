import DateReserve from "@/components/DateReserve"
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Dayjs } from "dayjs"
import Link from "next/link"
export default function LoginPage() {
    return (
<div className="font-mono flex flex-col items-center ">
            
            <hr className="w-[100%] " />
            <div className="text-center flex flex-col items-center justify-center   
            border-[#4AC9FF] border-2 shadow-lg rounded-xl p-10 w-[700px] h-[600px] mx-auto my-10 ">
                <h1 className="text-5xl py-5 font-medium h-[80px] bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                inline-block bg-clip-text text-transparent  ">Register</h1>
                <div className="flex flex-col items-center">
                    <TextField name="Name" label="Name" variant="standard" className="w-[500px]"
                    fullWidth  /> <br />
                    <TextField name="Email" label="Email" variant="standard" className="w-[500px] h-[50px]"
                    fullWidth  /> <br />
                    <TextField name="Password" label="Password" variant="standard" className="w-[500px] h-[75px]"
                    fullWidth  />
                    <TextField name="Tel." label="Tel." variant="standard" className="w-[500px] h-[50px]"
                    fullWidth  /> <br />

                    
                    
                    
                    <button className="block rounded-md px-3 py-2
                    text-white shadow-sm w-[100%] my-2
                    bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF]
                    hover:from-[#4AC9FF] hover:to-[#4AC9FF] transition duration-500 h-[50px] ease-in-out hover:scale-105"
                    name="Book Venue">
                        Register
                    </button>
                </div>
            </div>
            
        </div>)}