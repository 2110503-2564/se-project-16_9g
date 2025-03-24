"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";

export default function ProfilePage() {
    
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "", tel: "" }); // เก็บข้อมูลผู้ใช้
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("userToken"); // ดึง Token จาก localStorage
                if (!token) {
                    throw new Error("No token found");
                }
                const userData = await getUserProfile(token);
                setUser({
                    name: userData.name,
                    email: userData.email,
                    tel: userData.tel || "N/A" // เผื่อว่า tel อาจไม่มีข้อมูล
                });
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
                setUser({ name: "Guest", email: "Not Available", tel: "N/A" });
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        localStorage.removeItem("userToken");
        router.push("/");
    };

    const goToChangePassword = () => {
        router.push("/changepassword");
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="font-mono flex flex-col items-center">
            <h1 className="text-3xl my-5">Your Information</h1>
            <div className="text-lg">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Tel:</strong> {user.tel}</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
                <button 
                    onClick={handleLogout}
                    className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 transition">
                    Log Out
                </button>
                <button onClick={goToChangePassword}
                className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 transition">
                    Change Password
                </button>
            </div>
        </div>
    );
}