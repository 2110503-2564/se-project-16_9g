"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";
import cancelReservation from "@/libs/cancelReservation";
import Deletecom from "@/components/Deletecom";
import Alert from "@/components/Alert";

interface Reservation {
    _id: string,
    resDate: string,
    resStartTime: string,
    resEndTime: string,
    tableSize: string,
    partySize: number,
    contact: string,
    name: string,
    status: string,
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);
    const [successDelete, setSuccessDelete] = useState(false);
    const handleDeleteClick = (reservationId: string) => {
        setReservationToDelete(reservationId);
        setShowDeleteModal(true);
    };
    const handleDeleteReservation = async (reservationId: string) => {
        if (!session?.user?.token) return;

        //const confirmDelete = window.confirm("Are you sure you want to cancel this reservation?");
        //if (!confirmDelete) return;

        try {
            await cancelReservation(reservationId, session.user.token);
            // alert("Reservation canceled successfully!");
            setSuccessDelete(true);

            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation._id !== reservationId)
            );

            // router.refresh();
        } catch (error: any) {
            alert("Failed to cancel reservation: " + error.message);
        }
        setShowDeleteModal(false);
        setReservationToDelete(null);
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
                    setReservations(res.data.filter((reservation: any) => reservation.lockedByAdmin === false && reservation.status === "pending"));
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

    console.log(reservations);

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
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 z-10">
                <h1 className="text-2xl text-black font-bold text-center mb-6">All Reservations</h1>
                {reservations.map((reservation) => (
                    <div
                        key={reservation._id}
                        className=" w-full bg-white rounded-lg shadow-md flex flex-row
            p-4 mb-4 items-center gap-5 text-black  "
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
                            <p className="py-2">Time: {reservation.resStartTime} - {reservation.resEndTime}</p>
                            <p className="py-2">Table: {reservation.tableSize}</p>
                        </div>
                        <div className="flex flex-col justify-between items-end ml-4 mt-auto">
                            <div className="flex flex-row gap-3">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 duration-300"
                                    onClick={() => handleDeleteClick(reservation._id)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 duration-300"
                                    onClick={() => router.push(`/editReservation?res=${reservation._id}`)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Deletecom
                open={showDeleteModal}
                onConfirm={() => { if (reservationToDelete != null) handleDeleteReservation(reservationToDelete) }}
                onCancel={() => setShowDeleteModal(false)}
                message="Are you sure you want to cancel this reservation?"
            />

            {successDelete &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <Alert message="Cancel Reservation Successfully!" date="" resName="" name="" time="" size="" />
                </div>
            }

        </div>
    );
}
