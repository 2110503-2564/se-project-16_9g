'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

interface Reservation {
  id: number;
  restaurantName: string;
  customerName: string;
  tel: string;
  date: string;
  time: string;
  numberOfPeople: number;
  imageUrl: string;
}

export default function MyReservationPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (session?.user?.token) {
        try {
          const userData = await getUserProfile(session.user.token);
          setUser(userData);
          // Fetch reservations
          const res = await fetch("/api/reservations");
          const data = await res.json();
          setReservations(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="w-full text-center">
        <p>Loading...</p>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">My Reservation</h1>
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="relative w-full bg-white rounded-lg shadow-md flex p-4 mb-4 items-center"
          >
            <div className="w-1/4">
              <Image
                src={reservation.imageUrl}
                alt={reservation.restaurantName}
                width={150}
                height={100}
                className="rounded-md object-cover w-full"
                unoptimized
              />
            </div>
            <div className="flex-1 ml-4">
              <p className="font-semibold">{reservation.restaurantName}</p>
              <p>Customer: {reservation.customerName}</p>
              <p>Tel: {reservation.tel}</p>
              <p>Date: {reservation.date}</p>
              <p>Time: {reservation.time}</p>
              <p>Number of people: {reservation.numberOfPeople}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => router.push(`/edit-reservation/${reservation.id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => alert("Delete function not implemented yet")}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
