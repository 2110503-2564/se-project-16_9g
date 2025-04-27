"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SidebarAllReward from "@/components/SidebarAllReward";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import getUserRewards from "@/libs/getUserRewards";

interface Reward {
  id: string;
  discountText?: string;
  name: string;
  description: string;
  pointsRequired: number;
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
const fetchUserData = async () => {
    if (!session?.user?.token) return;
    try {
      const userData = await getUserProfile(session.user.token);
      setUser(userData);
      setPointHistory(userData.pointHistory || []);
      setMyPoints(userData.points || 0); // อย่าลืม set points ด้วย
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // const fetchRewardsData = async () => {
  //   try {
  //     const response = await axios.get("/api/rewards");
  //     setRewards(response.data);
  //   } catch (error) {
  //     console.error("Error fetching rewards:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchUserRewards = async () => {
    try {
      if (!session?.user?._id) return;
      if (!session?.user?.token) return;
      const response = await getUserRewards(session.user._id , session.user.token)
      setRewards(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, [session?.user?.token]);
  
  useEffect(() => {
    fetchUserRewards();
  }, []);
  

  const filteredRewards = rewards.filter((reward) =>
    reward.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-mono">
      <SidebarAllReward />

      <div className="flex-1 ml-[320px] p-8">
        {/* หัวข้อ All Rewards ตรงกลาง */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">My Rewards</h1>
        </div>

        {/* ส่วนที่เหลือเต็มจอ */}
        <div className="w-full">

          {/* My Points */}
          <div className="flex justify-end mb-6">
            <p className="font-medium">My points: {myPoints}</p>
          </div>

          {/* Search
          <div className="flex items-center mb-6">
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
                  className="flex bg-white shadow-md rounded-lg overflow-hidden"
                >
                  {/* Discount Section */}
                  <div className="flex items-center justify-center w-32 bg-yellow-100 text-2xl font-bold text-gray-700">
                    {reward.discountText ? (
                      <span>{reward.discountText}</span>
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
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{reward.name}</h2>
                      <p className="text-gray-600">{reward.description}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-500">valid to:{reward.validTo}</p>
                      <div className="flex items-center space-x-4">
                        
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Use</button>
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
