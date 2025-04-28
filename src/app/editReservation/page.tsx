"use client";
import Image from "next/image";
import DateReserve from "@/components/DateReserve";
import TimeReserve from "@/components/TimeReserve";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import getReservation from "@/libs/getReservation";
import editReservation from "@/libs/editReservation";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import getUserProfile from "@/libs/getUserProfile";
import Alert from "@/components/Alert";
import deleteReservation from "@/libs/deleteReservation";
import makeReservation from "@/libs/makeReservation";
import CheckTableForm from "@/components/CheckTableForm";
import TableCardList from "@/components/TableCardList";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


export default function EditReservation() {
  const router = useRouter();
  const [resDate, setResDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [resTime, setResTime] = useState<string>(dayjs().format("HH:mm:ss"));
  const [endTime, setEndTime] = useState<string>(dayjs().format("HH:mm:ss"));
  const [reservationData, setReservationData] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [duration, setDuration] = useState<number>(0);
  const [tableSize, setTableSize] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");

  const [availableTables, setAvailableTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<any | null>(null);

  const { data: session } = useSession();
  const params = useSearchParams();
  const reservationId = params.get("res");

  useEffect(() => {
    if (!session?.user?.token || !reservationId) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch reservation data
        const res = await getReservation(reservationId, session.user.token);
        if (res?.data) {
          setReservationData(res.data);
          setName(res.data.name);
          setContact(res.data.contact);
          setResDate(res.data.resDate);
          setResTime(res.data.resStartTime);
          setDuration(res.data.duration);
          setTableSize(res.data.tableSize);
          setEndTime(res.data.resEndTime);
          setRestaurantId(res.data.restaurant._id);
        }

        // Fetch user profile data
        const userRes = await getUserProfile(session.user.token);
        if (userRes?.data) {
          setUserProfile(userRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.token]);

  console.log(reservationData);

  const handleEditReservation = async () => {
    
    setError("");
    setSuccess(false);
    if (!session?.user?.token || !reservationId) return;

    if (!validationCheck()) return;
    
    const resStartTime = resTime.split(' ')[0];
    console.log(resStartTime);

    const endhour = parseInt(resStartTime.split(":")[0]) + duration;
    const endTime = `${endhour.toString().padStart(2, "0")}:00`;
    console.log(endTime);

    setSaving(true);
    try {
      
      // await cancelReservation(reservationData._id, session.user.token);
      await deleteReservation(reservationId, session.user.token);

      const response = await makeReservation(
        userProfile._id,
        name,
        contact,
        restaurantId,
        resDate,
        resStartTime,
        endTime,
        tableSize,
        false,
        session.user.token
      );
      
      setSuccess(true);
      // setTimeout(() => {
      //   router.push('/myReservation');
      // }, 2000);
    } catch (error: any) {
      alert("Failed to update reservation: " + error.message);
    } finally {
      setSaving(false);
    }

  };

  const validationCheck = (): boolean => {
    if (!name || !contact || !reservationData || !resDate || !resTime || !duration || !tableSize) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  // if (loading) {
  //   return (
  //     <div className="w-full text-center">
  //       <p>Loading...</p>
  //       <LinearProgress />
  //     </div>
  //   );
  // }

  if (!reservationData) {
    return (
      <div className="w-full text-center text-gray-500">
        <h1>Reservation not found.</h1>
      </div>
    );
  }


  return (
    <div className="flex flex-row justify-center  my-10 font-mono">
      {/* ฝั่งซ้าย - ตรวจสอบโต๊ะ */}
      <div className="w-full lg:w-[50%]">
        <div className="mb-8">
          <CheckTableForm
            restaurantId={restaurantId}
            token={session?.user?.token || ' '}
            onResult={(results, selectedDuration, selectedDate, partySize) => {
              setAvailableTables(results);
              setDuration(selectedDuration);
              setResDate(selectedDate);
              // setPartySize(partySize);
            }}
          />
        </div>
        <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow">
          <div>
            <h2 className="text-xl font-semibold mb-2">Available Tables</h2>
            <TableCardList
              tables={availableTables}
              onTableSelect={(date, time, table) => {
                setSelectedTable({ date, time, table });
                setResTime(time);
                setTableSize(table);
                console.log(table);
              }}
            />
          </div>
        </div>
      </div>

      <form
        className="w-[500px] p-5 flex flex-col items-center rounded-xl shadow-md"
      >
        <div className="text-2xl">Edit Reservation</div>
        <div className="my-5">
          <Image
            src={reservationData?.restaurant.picture}
            width={500}
            height={300}
            alt={reservationData?.restaurant.name || "Restaurant"}
            className="w-auto h-[300px] m-auto rounded-lg"
            unoptimized
          />

        </div>
        <div className="text-xl">
          {reservationData?.restaurant.name || "Loading..."}
        </div>
        <div className="w-[95%]">
          <div className="flex flex-row justify-between my-3 items-center">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border-2 border-slate-300 w-[70%] h-[40px] px-2 rounded-md bg-white"
            />
          </div>
          <div className="flex flex-row justify-between my-3 items-center">
            <label htmlFor="tel">Contact *</label>
            <input
              type="text"
              id="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              className="border-2 border-slate-300 w-[70%] h-[40px] px-2 rounded-md bg-white"
            />
          </div>

          <div className="flex justify-between items-center  py-2">
            <label>Date</label>
            <input
              type="text"
              value={resDate}
              disabled
              className="w-[70%] h-10 px-2 border-2 border-slate-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="flex justify-between items-center py-2">
            <label>Time</label>
            <input
              type="text"
              value={resTime}
              disabled
              className="w-[70%] h-10 px-2 border-2 border-slate-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="flex justify-between items-center">
            <label>Duration</label>
            <input
              type="number"
              value={duration}
              disabled
              className="w-[70%] h-10 px-2 border-2 border-slate-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="flex justify-between items-center my-3">
            <label>Table Size</label>
            <FormControl className="w-[70%] ">
              <input
                type="text"
                value={tableSize}
                disabled
                className="h-10 px-3 border-2 border-slate-300 rounded-md bg-gray-100 text-gray-800"
              />
            </FormControl>
          </div>

          {success && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
              <Alert
                message="Updating Reservation Successful!"
                resName={' '}
                name={name}
                date={resDate}
                time={resTime}
                size={tableSize}
              />
            </div>
          )}
          <div className="mt-5 text-center flex flex-row gap-3">
            <button onClick={(e) => {e.preventDefault(); e.stopPropagation() ; router.push("/myReservation")}}
              className="w-1/2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 duration-300 hover:text-white">
              Cancel Editing
            </button>
            <button
              onClick={(e) => { e.preventDefault(); handleEditReservation()}}
              className="bg-yellow-500 w-[50%] text-white px-10 py-2 rounded-md hover:bg-yellow-700 duration-300"
              disabled={saving}
            >
              {saving ? "Saving..." : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}