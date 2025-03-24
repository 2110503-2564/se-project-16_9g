import DateReserve from "@/components/DateReserve"
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Dayjs } from "dayjs"
import Link from "next/link"
export default function LoginPage() {
    return (
        <div className="font-mono flex flex-col items-center">
            <hr className="w-[100%]" />
            
            <div className="text-center flex flex-col items-center justify-center   
                border-[#4AC9FF] border-2 shadow-lg rounded-xl p-10 w-[700px] h-[600px] mx-auto my-10">
                
                <h1 className="text-5xl py-5 font-medium h-[150px] bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                    inline-block bg-clip-text text-transparent">Login by email
                </h1>

                <div className="flex flex-col items-center w-[100%] justify-center space-y-4">
                    <div className="flex flex-row items-center w-[100%] justify-center">
                        <label htmlFor="Email" className="w-[120px] text-left mr-4">Email</label>
                        <input type="text" name="Email" id="Email"
                            className="border-2 border-[#4AC9FF] w-[300px] h-[40px] px-2 rounded-md focus:outline-none"/>
                    </div> 
                    <div className="flex flex-row items-center justify-center w-[100%]">
                        <label htmlFor="Password" className="w-[120px] text-left mr-4">Password</label>
                        <input type="password" name="Password" id="Password"
                            className="border-2 border-[#4AC9FF] w-[300px] h-[40px] px-2 rounded-md focus:outline-none"/>
                    </div>
                </div>

                <button className="block rounded-md px-3 py-2
                    text-white shadow-sm w-[100%] my-5
                    bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF]
                    hover:from-[#4AC9FF] hover:to-[#4AC9FF] transition duration-500 h-[50px] ease-in-out hover:scale-105">
                    Login
                </button>

                <Link rel="stylesheet" href="/register">
                    <h1 className="h-[50px]">Don't have an account?</h1>
                </Link>
            </div>
        </div>
    )
}
