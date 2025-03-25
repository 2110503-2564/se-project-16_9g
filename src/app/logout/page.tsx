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
                shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] rounded-xl p-10 w-[400px] 
                h-[400px] mx-auto my-10">
                
                <h1 className="text-5xl py-2 font-medium text-[#4AC9FF]
                    inline-block">Logout</h1>
                
                <div className="flex flex-col items-center p-5">
                    <h1 className="text-2xl py-3">Do you want to logout?</h1>
                    
                    <button onClick={handleLogout} className="block rounded-md px-3 py-2
                        text-white shadow-sm w-[100%] my-2
                        bg-[#4AC9FF]
                        hover:bg-[#0356a3] duration-300 h-[50px] ease-in-out hover:scale-105">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
