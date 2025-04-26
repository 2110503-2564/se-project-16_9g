import Link from "next/link";

export default function SidebarAllReward() {
    return (
        <div className="w-[300px] fixed top-[60px] left-0 bottom-0 my-3 mx-3 rounded-lg shadow-[0px_0px_8px_4px_rgba(0,0,0,0.15)]
        p-3 text-lg text-center z-50 bg-white overflow-y-auto">
            <div className="flex flex-col  ">
                <h1 className="bg-[#4AC9FF] py-3 my-4 rounded-lg text-white" >MENU</h1>
                <Link href={'/all-rewards'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >View All Rewards</Link> <br />
                <Link href={'/myRewards'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >My Rewards</Link> <br />
            </div>
        </div>
    );
}