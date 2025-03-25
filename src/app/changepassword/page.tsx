"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import changePassword from "@/libs/changePassword";
import Link from "next/link";

export default function ChangePassWordPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!session?.user?.token) {
            alert("User not authenticated.");
            return;
        }

        if (!currentPassword || !newPassword) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            await changePassword(session.user._id, session.user.token, currentPassword, newPassword);
            alert("Password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            router.push("/profile"); // Redirect to profile page after success
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-mono flex flex-col items-center">
            <hr className="w-[100%]" />
            <div className="text-center flex flex-col items-center justify-center    
                border-2 rounded-xl p-5 w-[550px] h-[550px] mx-auto my-10 shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]">
                <h1 className="text-5xl py-5 font-medium bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                    inline-block bg-clip-text text-transparent">
                    Change Password
                </h1>
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between my-3 items-center mx-5">
                        <label htmlFor="Current_Password" className="text-left w-[35%]">Current Password</label>
                        <input
                            type="password"
                            name="Current_Password"
                            id="Current_Password"
                            placeholder="Enter your Current Password"
                            className="border-2 border-slate-300 h-[40px] w-full px-2 rounded-md focus:outline-none"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-between my-3 items-center mx-5">
                        <label htmlFor="New_Password" className="text-left w-[35%]">New Password</label>
                        <input
                            type="password"
                            name="New_Password"
                            id="New_Password"
                            placeholder="Enter your New Password"
                            className="border-2 border-slate-300 h-[40px] w-full px-2 rounded-md focus:outline-none"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="rounded-md text-white shadow-sm w-[90%] my-3 mx-auto bg-[#4AC9FF]
                            transition duration-500 h-[50px] ease-in-out hover:scale-105 disabled:opacity-50"
                        onClick={handleChangePassword}
                        disabled={loading}
                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                    <Link href="/profile" className="text-[#4AC9FF] text-lg pl-3">
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
}
