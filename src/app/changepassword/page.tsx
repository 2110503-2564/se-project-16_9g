import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { Dayjs } from "dayjs"
import Link from "next/link"
export default function LoginPage() {
    return (
<div className="font-mono flex flex-col items-center ">
            
            <hr className="w-[100%] " />
            <div className="text-center flex flex-col items-center justify-center   
            border-2 rounded-xl p-10 w-[700px] h-[500px] mx-auto my-10 ">
                <h1 className="text-5xl py-5 font-medium  bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                inline-block bg-clip-text text-transparent  ">Change Password</ h1>
                <div className="flex flex-col items-center ">

                    <div className="flex flex-row justify-between my-3 items-center p-3">
                        <label htmlFor="Current_Password">Current Password</label>
                        <input type="text" name="Current_Password" id="Current_Password" placeholder="Enter your Current Password"
                        className="border-2 border-slate-300 w-[100%] h-[40px] mx-5 px-2 rounded-md focus:outline-none"/>
                    </div> 
                    <div className="flex flex-row justify-between my-3 items-center p-4">
                        <label htmlFor="New_Password">New Password</label>
                        <input type="text" name="New_Password" id="New_Password" placeholder="Enter your New Password"
                        className="border-2 border-slate-300 w-[100%] h-[40px] mx-5 px-2 p-3 rounded-md focus:outline-none"/>
                    </div>
                    <button className="block rounded-md px-3 py-2 
                    text-white shadow-sm w-[100%]  my-2
                    bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF]
                    hover:from-[#4AC9FF] hover:to-[#4AC9FF] transition duration-500 h-[50px] ease-in-out hover:scale-105"
                    name="Book Venue">
                        Change Password
                    </button>
                    <span className="h-[50px] text-black ">
                        <Link href="/profile" className="text-[#4AC9FF] text-lg pl-3">
                            Cancel
                        </Link>
                    </span>
                    
                </div>
            </div>
            
        </div>)}