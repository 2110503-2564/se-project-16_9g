import TopMenuItem from "./TopMenuItem";
import { Link } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/[...nextauth]/authOptions";


export default async function TopMenu() {
    const session = await getServerSession(authOptions)

    return (
        <div className="w-screen h-[60px] bg-[#4AC9FF] flex flew-row justify-end top-0 z-30 px-8 py-2 font-serif ">
            <div className="text-medium  absolute  flex absolute left-0 item-center">
                <TopMenuItem label="Home" href="/" />
            </div>
            <div className="text-medium  relative  flex absolute item-center">
                <TopMenuItem label="Register" href="/register"/>
            </div>
            {
                session? 
                    <Link href="/logout">
                        <div className="flex items-center underline relative left-0 h-full px-5 absolute right-0 text-white text-sm w-fit">
                            Log Out {session.user?.name}
                        </div>
                    </Link>
                    :<Link  href="/login">
                        <div className="text-medium underline relative  flex absolute item-center text-white font-serif top-2">
                            Log In
                        </div>
                    </Link>
            }
        </div>
    );
}