'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function AllRewardsPage() {

    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/rewards");
            setRewards(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching rewards:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>All Rewards</h1>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : rewards.length === 0 ? (
                    <p>No rewards available.</p>
                ) : (
                    <ul>
                        {rewards.map((reward: any) => (
                            <li key={reward.id}>
                                <h2>{reward.name}</h2>
                                <p>{reward.description}</p>
                                <p>Points: {reward.pointsRequired}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}