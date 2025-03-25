"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";

interface Reservation {
    _id: string,
    resDate: string,
    resTime: string,
    partySize: number,
    contact: string,
    name: string,
    restaurant: {
        _id: string,
        name: string,
        picture?: string,
    },
    user: {
        name: string,
    }
}

export default function MyReservationPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const handleDeleteReservation = async (reservationId: string) => {
        if (!session?.user?.token) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this reservation?");
        if (!confirmDelete) return;

        try {
            await deleteReservation(reservationId, session.user.token);
            alert("Reservation deleted successfully!");

            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation._id !== reservationId)
            );

            router.refresh();
        } catch (error: any) {
            alert("Failed to delete reservation: " + error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.token) return;

            setLoading(true);
            try {
                const userData = await getUserProfile(session.user.token);
                setUser(userData);

                const res = await getReservations(session.user.token);
                if (res?.data) {
                    setReservations(res.data);
                } else {
                    setReservations([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setReservations([]);
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

    if (reservations.length === 0) {
        return (
            <div className="w-full text-center text-gray-500">
                <h1>No reservations found.</h1>
            </div>
        );
    }

    return (
        <div className=" p-6 font-mono">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6">My Reservations</h1>
                {reservations.map((reservation) => (
                    <div
                        key={reservation._id}
                        className="relative w-full bg-white rounded-lg shadow-md flex flex-row
            p-4 mb-4 items-center gap-5  "
                    >
                        {reservation.restaurant?.picture && (
                            <div className="w-1/4">
                                <Image
                                    src={reservation.restaurant.picture}
                                    alt={reservation.restaurant.name}
                                    width={150}
                                    height={100}
                                    className="rounded-md object-cover w-full"
                                    unoptimized
                                />
                            </div>
                        )}
                        <div className="flex-1 ml-4">
                            <p className="font-semibold text-xl py-2">{reservation.restaurant.name}</p>
                            <p className="py-2">Customer: {reservation.name}</p>
                            <p className="py-2">Tel: {reservation.contact}</p>
                            <p className="py-2">Date: {reservation.resDate}</p>
                            <p className="py-2">Time: {reservation.resTime}</p>
                            <p className="py-2">Number of people: {reservation.partySize}</p>
                        </div>
                        <div className="flex gap-3 absolute bottom-0 right-0 m-3">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 duration-300"
                                onClick={() => router.push(`/editreservation?res=${reservation._id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 duration-300"
                                onClick={() => handleDeleteReservation(reservation._id)}
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
