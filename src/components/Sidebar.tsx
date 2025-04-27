import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-[300px] fixed top-[60px] left-0 bottom-0 my-3 mx-3 rounded-lg shadow-[0px_0px_8px_4px_rgba(0,0,0,0.15)]
        p-3 text-lg text-center z-50 bg-white overflow-y-auto">
            <div className="flex flex-col  ">
                <h1 className="bg-[#4AC9FF] py-3 my-4 rounded-lg text-white" >MENU</h1>
                <Link href={'/restaurants'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >All Restaurants</Link> <br />
                <Link href={'/addrestaurant'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >Add Restaurant</Link> <br />
                <Link href={'/admin-reservations'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >All Reservations</Link> <br />
                <Link href={'/tables'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >Table Management</Link> <br />
                <Link href={'/tables-status'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >Locking Table</Link> <br />
                <Link href={'/transactions'} className="py-2 px-3 rounded-lg border border-slate-300
                hover:scale-105 duration-300" >Transaction Histories</Link> <br />
            </div>
        </div>
    );
}