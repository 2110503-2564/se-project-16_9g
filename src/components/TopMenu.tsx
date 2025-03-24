import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]/authOptions";


export default async function TopMenu() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <div className="w-screen h-[60px] bg-[#4AC9FF] flex flew-row justify-end top-0 z-30 px-8 py-2 font-serif ">
            <div className="text-medium  absolute  flex absolute left-0 item-center">
                <TopMenuItem label="Home" href="/" />
                {/* <TopMenuItem label="My Reservation" href="/myreservation" />
                <TopMenuItem label="edit" href="/editreservation" />
                <TopMenuItem label="Profile" href="/profile" /> */}
            </div>
            {
                session? 
                    <Link href="/api/auth/signout">
                        <div className="flex items-center underline relative left-0 h-full px-5 absolute right-0 text-white text-sm w-fit">
                            Log Out
                        </div>
                    </Link>
                    :<div className="flex flex-row gap-4"> 
                        <Link href="/register">
                            <div className="text-medium underline relative  flex absolute item-center text-white font-serif top-2">
                                Register
                            </div>
                        </Link>
                        <Link href="/api/auth/signin">
                            <div className="text-medium underline relative  flex absolute item-center text-white font-serif top-2">
                                Log In
                            </div>
                        </Link>
                    </div>
            }
        </div>
    );
}