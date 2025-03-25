import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";


export default async function TopMenu() {
    const session = await getServerSession(authOptions)

    return (
        <div className="w-screen h-[60px] bg-[#4AC9FF] flex flew-row relative z-30 px-8 items-center font-mono text-xl justify-between ">
            <div className=" flex flex-row justify-start items-center ">
                <TopMenuItem label="Home" href="/" />
                {
                    session  ?
                    <Link href="/myReservation" className="no-underline">
                        <div className=" h-full px-5 text-white text-xl  w-fit">
                            My Reservation
                        </div>
                    </Link>
                    : null
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