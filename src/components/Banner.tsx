'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';;

export default function Banner() {
    const router = useRouter();
    const {data: session} = useSession();

    return (
        <div className="relative w-screen h-[75vh] font-mono">
            <div className="absolute w-full h-full bg-black top-0 left-0 z-10 opacity-70 "></div>
            <Image src="/img/cover.jpg" alt="cover" fill priority />
            <div className="relative z-20 top-[30%] text-center text-white text-5xl object-cover  ">
                <h1 className="py-5">Welcome to Restaurant Reservation Website</h1>
                <h3 className="py-5">By StepBack</h3>
                {
                session? <div className='z-30 absolute right-10 top-5 font-semibold text-cyan-800 text-xl'>
                    Hello {session.user?.name}
                    </div> : null
                }
                <div className="m-3">
                    <Link href={'/restaurants'} className="text-xl bg-[#4AC9FF] px-5 py-3
                    rounded-lg hover:bg-[#0356a3] duration-300">View All Restaurants</Link>
                </div>
            </div>
        </div>
    );
}