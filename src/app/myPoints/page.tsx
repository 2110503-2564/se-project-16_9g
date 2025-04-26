"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import getTransactions from "@/libs/getTransactions";
import dayjs from "dayjs";

interface PointHistory {
  _id: string;
  user: string;
  type: "earn" | "redeem";
  source: "reservation" | "reward";
  sourceId: string;
  amount: number;
  message: string;
  createdAt: string;
}

export default function MyPointsPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.token) return;
      try {
        const userData = await getUserProfile(session.user.token);
        setUser(userData.data);
        const transactions = await getTransactions(session.user.token);
        const sortedTransactions = transactions.data.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
        setPointHistory(sortedTransactions);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.user?.token]);

  if (loading) {
    return (
      <div className="w-full text-center">
        <p>Loading...</p>
        <LinearProgress />
      </div>
    );
  }

  console.log(user)
  console.log(pointHistory)
  return (
    <div className="p-6 font-mono">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">My Points</h1>

        <div className="bg-green-500 text-white rounded-md p-4 text-center shadow-md mb-4">
          <p className="text-lg">Your Current Points : {user?.currentPoints }</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {/* แก้ตรงนี้ ใช้ Link ครอบปุ่ม */}
          <Link href="/myRewards">
            <button className="bg-sky-400 hover:bg-sky-600 text-white px-6 py-2 rounded-md">
              My Rewards
            </button>
          </Link>
          <Link href="/all-rewards">
            <button className="bg-sky-400 hover:bg-sky-600 text-white px-6 py-2 rounded-md">
              All Rewards
            </button>
          </Link>
        </div>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold text-center mb-4">
          My Point Transaction History
        </h2>

        <div className="space-y-4">
          {pointHistory.length > 0 ? (
            pointHistory.map((history) => (
              <div
                key={history._id}
                className={`border-2 ${
                  history.type === "earn" ? "border-green-500" : "border-red-500"
                } rounded-lg p-4 flex justify-between items-center`}
              >
                <div>
                  <p className="font-medium">Date: {dayjs(history.createdAt).format("YYYY-MM-DD")}</p>
                  <p className="font-medium">Time: {dayjs(history.createdAt).format("HH:mm")}</p>
                  {/* <p>Restaurant Name: {history.source}</p> */}
                  <p>Description: {history.message}</p>
                  <p className="text-lg">Amount: {history.amount}</p>
                </div>
                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-white ${
                      history.type === "earn" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {history.type === "earn" ? "Earn" : "Redeem"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No point transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
