'use client'
import AddReview from "@/components/AddReview";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getRestaurant from "@/libs/getRestaurant";
import { LinearProgress } from "@mui/material";
import getUserProfile from "@/libs/getUserProfile";

export default function ReviewPage() {
    const params = useParams();
    const rid = Array.isArray(params?.rid) ? params.rid[0] : params?.rid; 

    const [res, setRes] = useState<any | null>(null);
    const { data: session } = useSession();
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  

            try {
                if (rid) {
                    const resData = await getRestaurant(rid);
                    setRes(resData);
                } else {
                    throw new Error("Restaurant ID not found");
                }

                if (session?.user?.token) {
                    const userData = await getUserProfile(session.user.token);
                    setUser(userData);
                } else {
                    console.log("No session found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [rid, session]);

    if (loading) {
        return (
            <div className="w-full text-center">
                <p>Loading...</p>
                <LinearProgress />
            </div>
        );
    }

    if (!res) {
        return <div className="w-full text-center">Error: Unable to load restaurant data</div>;
    }

    if (!user) {
        return <div className="w-full text-center">Error: User profile not found</div>;
    }

    return (
        <div className="flex flex-col items-center font-mono">
            <AddReview 
                resName={res.data.name} 
                rid={res.data.id} 
                uid={user.data._id} 
                token={session?.user.token || ""} 
            />
        </div>
    );
}
