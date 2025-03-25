"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { LinearProgress } from "@mui/material";

export default function ProfilePage() {
    
    const router = useRouter();
    const [user, setUser] = useState<any>(null); 
    const [loading, setLoading] = useState(true);
    const {data: session} = useSession();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!session?.user.token) {
                    throw new Error("No token found");
                }
                const userData = await getUserProfile(session.user.token);
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        router.push('/api/auth/signout')
    };

    const goToChangePassword = () => {
        router.push("/changepassword");
    };

    if (loading) {
        return <div className="text-center text-lg">Loading... <LinearProgress /></div>;
    }

    return (
        <div className="font-mono flex flex-col items-center shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] 
        w-[500px] h-[500px] justify-center my-5 mx-auto rounded-lg ">
            <h1 className="text-3xl my-5">Your Information</h1>
            {
                user ? (
                    <div className="text-xl my-5">
                        <p className="py-3"><strong>Name:</strong> {user.data.name}</p>
                        <p className="py-3"><strong>Email:</strong> {user.data.email}</p>
                        <p className="py-3"><strong>Tel:</strong> {user.data.tel}</p>
                    </div>
                ) : null
            }

            <div className="flex flex-row gap-3">
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