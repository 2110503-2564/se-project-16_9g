"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.error) {
            setError("Invalid email or password");
        } else {
            const previousPage = document.referrer;
            if (previousPage) {
                router.push(previousPage);
                router.refresh();
            } else {
                router.push("/"); 
                router.refresh();
            }
        }
    };

    return (
        <div className="font-mono flex flex-col items-center max-w-[700px] max-h-[700px] justify-center m-auto">
            <hr className="w-[100%]" />

            <div className="text-center flex flex-col items-center justify-center   
                border-[#4AC9FF] border-2 shadow-lg rounded-xl p-10 mx-auto my-5">

                <h1 className="text-5xl py-8  bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] 
                    inline-block bg-clip-text text-transparent">Login by Email
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col items-center w-[100%] justify-center space-y-4 mb-5">
                    <div className="flex flex-row items-center w-full py-3 justify-center">
                        <label htmlFor="Email" className="w-[120px] text-left mr-4">Email</label>
                        <input
                            type="email"
                            id="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-[#4AC9FF] w-[300px] h-[40px] px-2 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex flex-row items-center justify-center w-full pt-2 pb-3">
                        <label htmlFor="Password" className="w-[120px] text-left mr-4">Password</label>
                        <input
                            type="password"
                            id="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-[#4AC9FF] w-[300px] h-[40px] px-2 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="block rounded-md px-3 py-2 text-white shadow-sm w-[100%] my-5
                        bg-gradient-to-r from-[#4AC9FF] to-[#4AC9FF] transition duration-500 h-[50px] 
                        ease-in-out hover:scale-105">
                        Login
                    </button>
                </form>

                <span className="h-[50px] text-black ">Don't have an account? 
                    <Link href="/register" className="text-[#4AC9FF] text-lg pl-3">
                        Register Here
                    </Link>
                </span>
            </div>
        </div>
    );
}
