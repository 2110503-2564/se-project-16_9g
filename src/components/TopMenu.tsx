'use client';
import TopMenuItem from "./TopMenuItem";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserProfile from "@/libs/getUserProfile";

export default function TopMenu() {
    const { data: session, status } = useSession();
    const [role, setRole] = useState("");
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (session?.user?.token) {
                const profile = await getUserProfile(session.user.token);
                setRole(profile.data.role);
                setProfile(profile);
            }
        };
        fetchUser();
    }, [session]);

    return (
        <div className="fixed top-0 left-0 w-screen h-[60px] bg-[#4AC9FF] flex flew-row mb-[60px] z-[100] 
        px-8 items-center font-mono text-xl justify-between overflow-auto ">
            <div className=" flex flex-row justify-start items-center ">
                {
                    profile && role === 'admin' ? (
                        <TopMenuItem label="Home" href="/restaurants" />
                    ) : (
                        <TopMenuItem label="Home" href="/" />
                    )
                }


                <TopMenuItem label="Restaurants" href="/restaurants" />
                {
                    session &&
                    <Link href="/myReservation" className="no-underline">
                        <div className=" h-full px-5 text-white text-xl  w-fit">
                            My Reservation
                        </div>
                    </Link>
                }
            </div>
            <div >
                {
                    session ?
                        <div className="flex flex-row justify-end">
                            <Link href="/api/auth/signout" className="no-underline">
                                <div className=" h-full px-5 text-white ">
                                    Log Out
                                </div>
                            </Link>
                            <Link href="/profile" className=" h-full px-5 text-white no-underline ">
                                Profile
                            </Link>
                        </div>
                        : <div className="flex flex-row gap-4 items-center px-3">
                            <Link href="/register" className="no-underline">
                                <div className=" text-white ">
                                    Register
                                </div>
                            </Link>
                            <Link href="/api/auth/signin" className="no-underline">
                                <div className=" text-white   ">
                                    Log In
                                </div>
                            </Link>
                        </div>
                }

            </div>
        </div>
    );
}