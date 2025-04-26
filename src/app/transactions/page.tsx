'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import getTransaction from "@/libs/getTransaction";
import TransactionBox from "@/components/TransactionBox";

export default function Transactions() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [transactions, setTransactions] = useState<any>("");
    const [filteredTransactions, setFilteredTransactions] = useState<any>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Filters
    const [userIdFilter, setUserIdFilter] = useState("");
    const [usernameFilter, setUsernameFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const fetchData = async () => {
        if (!session?.user?.token) {
            console.warn("No token found.");
            setLoading(false);
            return;
        }

        try {
            const profileRes = await getUserProfile(session.user.token);
            const userProfile = profileRes.data;
            setProfile(userProfile);

            if (userProfile.role !== "admin") {
                alert("You are not authorized to view this page.");
                setLoading(false);
                return;
            }

            const transactionInfo = await getTransaction(session.user.token);
            if (transactionInfo !== null) {
                setTransactions(transactionInfo);
            } else {
                console.log("No transactions found.");
            }
        } catch (error) {
            console.error("Error in fetchData:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [session]);

    const handleSearch = () => {
        if (!transactions || !transactions.data) {
            console.log("No transactions to filter.");
            return;
        }

        let filtered = [...transactions.data];

        if (userIdFilter) {
            console.log("userId " + userIdFilter)
            filtered = filtered.filter((t: any) => t.user?._id?.includes(userIdFilter));
        }
        if (usernameFilter) {
            console.log("Username " + usernameFilter)
            filtered = filtered.filter((t: any) => t.user?.name?.includes(usernameFilter));
        }
        if (dateFilter) {
            console.log("date " + dateFilter)
            filtered = filtered.filter((t: any) =>
                new Date(t.createdAt).toLocaleDateString().includes(dateFilter)
            );
        }
        if (emailFilter) {
            console.log("email " + emailFilter)
            filtered = filtered.filter((t: any) => t.user?.email?.includes(emailFilter));
        }
        if (statusFilter) {
            console.log("status " + statusFilter)
            filtered = filtered.filter((t: any) => t.type?.includes(statusFilter));
        }

        setFilteredTransactions(filtered);
        // console.log(filteredTransactions)
        console.log(filtered);
        setIsSearching(true);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">Point Transaction Histories</h1>

            {/* Filters */}
            <div className="flex flex-row gap-10 justify-center mt-10 px-10 py-8 bg-white rounded-lg shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)] w-[80%] mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label>User ID</label>
                        <input
                            type="text"
                            className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="User ID"
                            value={userIdFilter}
                            onChange={(e) => setUserIdFilter(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label>Username</label>
                        <input
                            type="text"
                            className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="Username"
                            value={usernameFilter}
                            onChange={(e) => setUsernameFilter(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label>Date</label>
                        <input
                            type="text"
                            className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="Date (e.g. 4/26/2025)"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label>Email</label>
                        <input
                            type="text"
                            className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                            placeholder="Email"
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-row gap-3 items-center justify-between">
                        <label>Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-slate-300 bg-white rounded-lg p-2 focus:outline-none"
                        >
                            <option value="">Please Select</option>
                            <option value="earn">Earn</option>
                            <option value="redeem">Redeem</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center">
                    <button
                        onClick={handleSearch}
                        className="px-5 py-2 bg-[#4AC9FF] text-white rounded-md hover:bg-[#0356a3] duration-300"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Transactions */}
            <div className="flex flex-col gap-5 w-[80%] justify-center mx-auto mt-10">
                {(isSearching ? filteredTransactions : transactions?.data)?.length > 0 ? (
                    (isSearching ? filteredTransactions : transactions?.data)?.map((item: any) => (
                        <TransactionBox
                            key={item._id}
                            transactionID={item._id}
                            Date={new Date(item.createdAt).toLocaleString()}
                            UserId={item.user._id}
                            Username={item.user.name}
                            email={item.user.email}
                            type={item.type}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500">No transactions found.</div>
                )}
            </div>
        </div>
    );
}
