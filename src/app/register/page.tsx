"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
    const router = useRouter();
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        tel: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); 
        setLoading(true); 

        try {
            const response = await userRegister(user.email, user.password, user.name, user.tel);

            
            if (response) {
                alert("Registration successful! Redirecting to login...");
                router.push("/login"); 
            }
        } catch (error: any) {
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="font-mono flex flex-col items-center my-10 text-center">
            <form onSubmit={handleRegister} className="w-[500px] p-10 flex flex-col items-center rounded-xl shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]">
                <div className="text-3xl p-2">Register</div>
                {error && <p className="text-red-500">{error}</p>} {/* Show error if there's any */}
                
                <div className="w-full text-lg">
                    <div className="flex flex-row justify-between my-5 items-center">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            value={user.name}
                            onChange={handleChange}
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between my-5 items-center">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between my-5 items-center">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password"
                            value={user.password}
                            onChange={handleChange}
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between my-5 items-center">
                        <label htmlFor="tel">Telephone</label>
                        <input
                            type="text"
                            name="tel"
                            id="tel"
                            placeholder="Enter your telephone number"
                            value={user.tel}
                            onChange={handleChange}
                            className="border-2 border-slate-300 w-[70%] h-[40px] mx-5 px-2 rounded-md focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mt-5 text-center">
                        <button
                            type="submit"
                            className="bg-[#4AC9FF] w-[50%] text-white px-10 py-2 rounded-md hover:bg-[#0356a3] duration-300"
                            disabled={loading} 
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
