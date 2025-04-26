"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SidebarAllReward from "@/components/SidebarAllReward";

interface Reward {
  id: string;
  discountText?: string;
  name: string;
  description: string;
  pointsRequired: number;
  validity: string;
  image?: string;
}

export default function AllRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [myPoints, setMyPoints] = useState(127);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/rewards");
      setRewards(response.data);
    } catch (error) {
      console.error("Error fetching rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
          <h1 className="text-2xl font-bold text-center">All Rewards</h1>
        </div>

        {/* ส่วนที่เหลือเต็มจอ */}
        <div className="w-full">

          {/* My Points */}
          <div className="flex justify-end mb-6">
            <p className="font-medium">My points: {myPoints}</p>
          </div>

          {/* Search */}
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
          </div>

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
                      <p className="text-sm text-gray-500">{reward.validity}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-700 font-medium">
                          {reward.pointsRequired} points
                        </span>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                          Buy
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
