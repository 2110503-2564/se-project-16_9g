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
                <h1 className="text-5xl py-5 font-medium h-[150px] bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                inline-block bg-clip-text text-transparent  ">Login by email</ h1>
                <div className="flex flex-col items-center p-5">
                    <div className="flex flex-row">Email</div>
                    <div className=" item-center w-full border-[#4AC9FF] border-2 shadow-lg rounded-lg ">
                        <TextField name="Email" label="Email" variant="standard" className="w-[450px] h-[100px]"
                          />
                    </div>
                    <div className=" border-[#4AC9FF] border-2 shadow-lg rounded-lg ">
                        <TextField name="Password" label="Password" variant="standard" className="w-[500px] h-[100px]"
                        fullWidth  />
                    </div>

                    
                    
                    
                    <button className="block rounded-md px-3 py-2
                    text-white shadow-sm w-[100%] my-2
                    bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF]
                    hover:from-[#4AC9FF] hover:to-[#4AC9FF] transition duration-500 h-[50px] ease-in-out hover:scale-105"
                    name="Book Venue">
                        Login
                    </button>
                    <Link rel="stylesheet" href="/register" >
                        <h1 className=" h-[50px]"> don't have account?</h1>
                    </Link>
                </div>
            </div>
            
        </div>)}