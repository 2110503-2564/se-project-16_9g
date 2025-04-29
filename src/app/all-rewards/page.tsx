"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SidebarAllReward from "@/components/SidebarAllReward";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

interface Reward {
  id: string;
  discountText?: string;
  name: string;
  description: string;
  pointsRequired: number;
  validFrom: string;
  validTo: string;
  image?: string;
}
interface PointHistory {
  _id: string;
  date: string;
  restaurantName: string;
  type: "earn" | "redeem";
  points: number;
}


export default function AllRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [myPoints, setMyPoints] = useState(user?.points || 0);

  // ===> เปลี่ยนชื่อ function ไม่ให้ซ้ำกัน
const fetchData = async () => {
    if (!session?.user?.token) return;
    try {

      if (session?.user.token) {
        const response = await axios.get("/api/rewards");
        setRewards(response.data);

        const userData = await getUserProfile(session?.user.token);
        setUser(userData.data);
        setMyPoints(userData.data.currentPoints)
      }
    } catch (error) {
      console.error("Error fetching rewards:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [session?.user.token]);

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-mono">
      <SidebarAllReward />

      <div className="flex-1 ml-[320px] p-8">
        {/* หัวข้อ All Rewards ตรงกลาง */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">All Rewards</h1>
        </div>

        {/* ส่วนที่เหลือเต็มจอ */}
        <div className="w-full">

          {/* My Points */}
          <div className="flex justify-end mb-6">
            <p className="font-medium">My points: {myPoints}</p>
          </div>

          {/* Search */}
          {/* <div className="flex items-center mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="select restaurant"
              className="border px-4 py-2 rounded-l-md w-60"
            />
            <button className="bg-sky-400 text-white px-4 py-2 rounded-r-md">
              🔍
            </button>
          </div> */}

          {/* Rewards List */}
          <div className="space-y-6">
            {loading ? (
              <p>Loading...</p>
            ) : filteredRewards.length === 0 ? (
              <p>No rewards found.</p>
            ) : (
              filteredRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex flex-row bg-white shadow-md rounded-lg overflow-hidden  "
                >
                  {/* Discount Section */}
                  <div className="flex items-center justify-center w-[20%] px-3 bg-yellow-100 text-2xl font-bold text-gray-700">
                    {reward.name ? (
                      <span className="text-center">{reward.name}</span>
                    ) : reward.image ? (
                      <img
                        src={reward.image}
                        alt="reward"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 p-4 flex flex-col justify-center ">
                    <div>
                      {/* <h2 className="text-lg font-semibold">{reward.name}</h2> */}
                      <h2 className="text-lg">{reward.description}</h2>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-500">Available: {reward.validFrom} - {reward.validTo}</p>
                      <div className="flex items-center space-x-4">
                      <span className="text-gray-700 font-medium">
                          {reward.pointsRequired} points
                        </span>
                        <button
                          className={`px-4 py-2 rounded-md text-white ${reward.pointsRequired > myPoints ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                            }`}
                          disabled={reward.pointsRequired > myPoints}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
