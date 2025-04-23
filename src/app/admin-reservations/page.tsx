'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";
import getReservations from "@/libs/getReservations";
import deleteReservation from "@/libs/deleteReservation";
import Image from "next/image";
import { LinearProgress } from "@mui/material";
import Deletecom from "@/components/Deletecom";
import Alert from "@/components/Alert";
import cancelReservation from "@/libs/cancelReservation";

export default function AllResrvationsPageForAdmin() {

    const router = useRouter();

    const { data: session, status } = useSession();

    const [profile, setProfile] = useState<any>(null);
    const [allreservations, setAllReservations] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);
    const [successDelete, setSuccessDelete] = useState(false);
    const [menu, setMenu] = useState("pending");
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
                prevReservations.filter((reservation: any) => reservation._id !== reservationId)
            );

            // router.refresh();
        } catch (error: any) {
            alert("Failed to cancel reservation: " + error.message);
        }
        setShowDeleteModal(false);
        setReservationToDelete(null);
    };

    const handleChange = (menu: string) => {
        setReservations(allreservations.filter((reservation: any) => reservation.status === menu));
    }

    const fetchData = async () => {
        try {
            if (session?.user?.token) {
                const profile = await getUserProfile(session.user.token);
                setProfile(profile.data);
                if (profile.data.role !== "admin") {
                    alert("You are not authorized to view this page.");
                    return;
                }

                const reservations = await getReservations(session.user.token);
                if (reservations?.data) {
                    setAllReservations(reservations.data.filter((reservation: any) => reservation.lockedByAdmin === false));
                    setReservations(reservations.data.filter((reservation: any) => reservation.lockedByAdmin === false && reservation.status === "pending"));
                } else {
                    setAllReservations([]);
                    setReservations([]);
                }
            }


        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [session?.user?.token]);


    return (
        <div className="p-6 font-mono">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 z-10">
                <h1 className="text-2xl text-black font-bold text-center mb-6">All Reservations</h1>
                <div className="flex flex-row text-slate-600 gap-5 justify-around  mb-6">
                    <button className="hover:text-black duration-300 focus:text-black items-center"
                    onClick={() => { setMenu("pending"); handleChange("pending"); }}>Pending</button>
                    <button className="hover:text-black duration-300 focus:text-black items-center"
                    onClick={() => { setMenu("complete"); handleChange("complete"); }} >Complete</button>
                    <button className="hover:text-black duration-300 focus:text-black items-center"
                    onClick={() => { setMenu("incomplete"); handleChange("incomplete"); }} >Incomplete</button>
                    <button className="hover:text-black duration-300 focus:text-black items-center"
                    onClick={() => { setMenu("cancelled"); handleChange("cancelled"); }} >Cancelled</button>
                </div>
                {reservations.map((reservation: any) => (
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
                        {
                            menu === "pending" &&
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
                        }
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
    )
}