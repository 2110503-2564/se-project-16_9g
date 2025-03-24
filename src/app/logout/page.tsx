"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false }); 
        localStorage.removeItem("userToken"); 
        document.cookie = "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        router.push("/"); 
        router.refresh(); 
    };

    return (
        <div className="font-mono flex flex-col items-center">
            <hr className="w-[100%]" />
            <div className="text-center flex flex-col items-center justify-center   
                border-[#4AC9FF] border-2 shadow-lg rounded-xl p-10 w-[400px] h-[400px] mx-auto my-10">
                
                <h1 className="text-5xl py-5 font-medium h-[100px] bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                    inline-block bg-clip-text text-transparent">Logout</h1>
                
                <div className="flex flex-col items-center p-5">
                    <h1 className="text-2xl h-[70px]">Are you sure you want to logout?</h1>
                    
                    <button onClick={handleLogout} className="block rounded-md px-3 py-2
                        text-white shadow-sm w-[100%] my-2
                        bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF]
                        hover:from-[#4AC9FF] hover:to-[#4AC9FF] transition duration-500 h-[50px] ease-in-out hover:scale-105">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
