'use client'
import Banner from "@/components/Banner";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getUserProfile from "@/libs/getUserProfile";
import { LinearProgress } from "@mui/material";

export default function Home() {
  const {data: session} = useSession();
      const [user, setUser] = useState<any>(null); 
      const [loading, setLoading] = useState(true)
      const [role, setRole] = useState("");
  
      useEffect(() => {
          const fetchData = async () => {
              setLoading(true);  // Set loading to true when fetching data
  
              try {
  
                  // If session exists, fetch user profile
                  if (session?.user?.token) {
                      const userData = await getUserProfile(session.user.token);
                      if(userData) {
                          setRole(userData.data.role);
                      }
                  } else {
                      setUser(null)
                  }
              } catch (error) {
                  console.error("Error fetching data:", error);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchData();
      }, [session?.user.token]);

      if (loading) {
        return (
            <div className="w-full text-center">
                <p>Loading...</p>
                <LinearProgress />
            </div>
        );
    }

  return (
    <main>
      {
        role === 'admin' ? (
          null
        ) : (
          <Banner />
        )
      }

    </main>
  );
}
