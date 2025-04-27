'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";
import getReservations from "@/libs/getReservations";
import cancelReservation from "@/libs/cancelReservation";
import completeReservation from "@/libs/completeReservation"; // ✅
import incompleteReservation from "@/libs/IncompleteReservation"; // ✅
import Image from "next/image";
import Deletecom from "@/components/Deletecom";
import Alert from "@/components/Alert";

export default function AllResrvationsPageForAdmin() {
    const router = useRouter();
    const { data: session } = useSession();
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
        try {
            await cancelReservation(reservationId, session.user.token);
            setSuccessDelete(true);
            setReservations((prevReservations) =>
                prevReservations.filter((reservation: any) => reservation._id !== reservationId)
            );
        } catch (error: any) {
            alert("Failed to cancel reservation: " + error.message);
        }
        setShowDeleteModal(false);
        setReservationToDelete(null);
    };

    // 👈 เพิ่มฟังก์ชันสำหรับ Complete reservation
    const handleCompleteReservation = async (reservationId: string) => {
        if (!session?.user?.token) return;
        try {
            await completeReservation(reservationId, session.user.token);
            fetchData(); // ดึงข้อมูลใหม่หลังจากทำเสร็จ
        } catch (error: any) {
            alert("Failed to complete reservation: " + error.message);
        }
    };

    // 👈 เพิ่มฟังก์ชันสำหรับ Incomplete reservation
    const handleIncompleteReservation = async (reservationId: string) => {
        if (!session?.user?.token) return;
        try {
            await incompleteReservation(reservationId, session.user.token);
            fetchData(); // ดึงข้อมูลใหม่หลังจากทำเสร็จ
        } catch (error: any) {
            alert("Failed to mark reservation as incomplete: " + error.message);
        }
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
        <div className="p-6 font-mono w-full min-h-screen bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <h1 className="text-2xl text-black font-bold text-center mb-6">All Reservations</h1>

                {/* Menu Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <button className="hover:text-black text-slate-600 text-lg font-semibold duration-300 focus:text-black w-full"
                        onClick={() => { setMenu("pending"); handleChange("pending"); }}>
                        Pending
                    </button>
                    <button className="hover:text-black text-slate-600 text-lg font-semibold duration-300 focus:text-black w-full"
                        onClick={() => { setMenu("complete"); handleChange("complete"); }}>
                        Complete
                    </button>
                    <button className="hover:text-black text-slate-600 text-lg font-semibold duration-300 focus:text-black w-full"
                        onClick={() => { setMenu("incomplete"); handleChange("incomplete"); }}>
                        Incomplete
                    </button>
                    <button className="hover:text-black text-slate-600 text-lg font-semibold duration-300 focus:text-black w-full"
                        onClick={() => { setMenu("cancelled"); handleChange("cancelled"); }}>
                        Cancelled
                    </button>
                </div>

                {/* Reservation List */}
                <div className="flex flex-col gap-6">
                    {reservations.map((reservation: any) => (
                        <div
                            key={reservation._id}
                            className="bg-white rounded-lg shadow-md flex flex-col md:flex-row p-4 text-black w-full"
                        >
                            {reservation.restaurant?.picture && (
                                <div className="relative w-full md:w-1/3 h-48 md:h-auto mb-4 md:mb-0">
                                    <Image
                                        src={reservation.restaurant.picture}
                                        alt={reservation.restaurant.name}
                                        fill
                                        className="rounded-md object-cover"
                                        unoptimized
                                    />
                                </div>
                            )}

                            <div className="flex flex-col flex-1 md:ml-6">
                                <p className="font-semibold text-xl py-2">{reservation.restaurant.name}</p>
                                <p className="py-1">Customer: {reservation.name}</p>
                                <p className="py-1">Tel: {reservation.contact}</p>
                                <p className="py-1">Date: {reservation.resDate}</p>
                                <p className="py-1">Time: {reservation.resStartTime} - {reservation.resEndTime}</p>
                                <p className="py-1">Table: {reservation.tableSize}</p>

                                {menu === "pending" && (
                                    <div className="flex flex-wrap gap-2 mt-4 justify-end">
                                        {/* 👈 เปลี่ยนจาก console.log เป็นเรียกฟังก์ชันจริง */}
                                        <button
                                            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 duration-300 w-full md:w-auto"
                                            onClick={() => handleCompleteReservation(reservation._id)}
                                        >
                                            Complete
                                        </button>
                                        <button
                                            className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 duration-300 w-full md:w-auto"
                                            onClick={() => handleIncompleteReservation(reservation._id)}
                                        >
                                            Incomplete
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700 duration-300 w-full md:w-auto"
                                            onClick={() => handleDeleteClick(reservation._id)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-700 duration-300 w-full md:w-auto"
                                            onClick={() => router.push(`/editReservation?res=${reservation._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Modal */}
            <Deletecom
                open={showDeleteModal}
                onConfirm={() => { if (reservationToDelete != null) handleDeleteReservation(reservationToDelete) }}
                onCancel={() => setShowDeleteModal(false)}
                message="Are you sure you want to cancel this reservation?"
            />

            {/* Success Alert */}
            {successDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <Alert message="Cancel Reservation Successfully!" date="" resName="" name="" time="" size="" />
                </div>
            )}
        </div>
    )
}
