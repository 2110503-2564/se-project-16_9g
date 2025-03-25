import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]/authOptions";


export default async function TopMenu() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <div className="w-screen h-[60px] bg-[#4AC9FF] flex flew-row relative z-30 px-8 items-center font-serif justify-between ">
            <div className="text-medium flex flex-row justify-start items-center">
                <TopMenuItem label="Home" href="/" />
                {/* <TopMenuItem label="My Reservation" href="/myreservation" />
                <TopMenuItem label="edit" href="/editreservation" />
                <TopMenuItem label="Profile" href="/profile" /> */}
                {
                    session ?
                    <Link href="/myreservation">
                        <div className=" h-full px-5 text-white text-sm w-fit">
                            My Reservation
                        </div>
                    </Link>
                    : null
                }
            </div>
            <div >
                {
                    session ?
                        <Link href="/api/auth/signout" >
                            <div className=" underline h-full px-5 text-white text-sm ">
                                Log Out
                            </div>
                        </Link>
                        : <div className="flex flex-row gap-4 items-center px-3">
                            <Link href="/register">
                                <div className="text-medium underline text-white font-serif">
                                    Register
                                </div>
                            </Link>
                            <Link href="/api/auth/signin">
                                <div className="text-medium underline text-white font-serif ">
                                    Log In
                                </div>
                            </Link>
                        </div>
                }

            </div>
        </div>
    );
}