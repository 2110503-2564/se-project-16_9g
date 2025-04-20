"use client";

import React, { useState } from "react";
import checkAvailableTables from "@/libs/checkAvaliableTable";
import DateReserve from "./DateReserve";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios"; 

interface CheckTableFormProps {
  restaurantId: string;
  token: string;
  onResult?: (results: any[], duration: number, date: string, partySize: number) => void;
}

export default function CheckTableForm({ restaurantId, token, onResult }: CheckTableFormProps) {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [partySize, setPartySize] = useState(1);
  const [startTime, setStartTime] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResults([]);

    // เช็ควันที่ไม่เป็นอดีต
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(date);

    if (selectedDate.isBefore(today)) {
      setError("date cannot be in the past");
      return;
    }


    /* เช็คเวลาปิดร้าน
  const restaurantResponse = await axios.get(`http://localhost:5000/api/stb/restaurants/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("restaurantResponse.data =", restaurantResponse.data);
  
  const restaurant = restaurantResponse.data;

  // ตรวจสอบค่าของ closetime
  if (!restaurant.closetime || typeof restaurant.closetime !== "string") {
    setError("The restaurant's closing time is invalid.");
    return;
  }

  const [closeHour, closeMinute] = restaurant.closetime.split(":").map(Number);
  const [startHour, startMinute] = startTime.split(":").map(Number);

  // คำนวณเวลาเริ่มต้นและเวลาปิดร้าน
  const startDateTime = dayjs(date).hour(startHour).minute(startMinute);
  const endDateTime = startDateTime.add(duration, "hour");
  const closingDateTime = dayjs(date).hour(closeHour).minute(closeMinute);

  // ตรวจสอบว่าเวลาที่เลือกเกินเวลาปิดร้านหรือไม่
  if (endDateTime.isAfter(closingDateTime)) {
    setError("Restaurant is not available in your chosen reservation time.");
    return;
  } */


    

      try {

        const response = await checkAvailableTables(
          restaurantId,
          date,
          duration,
          partySize,
          token
        );

        if (response.success) {
          setResults(response.data);
          if (onResult) {
            onResult(response.data, duration, date, partySize);
          }
        } else {
          setError(response.message || "No tables available.");
        }
      } catch (err: any) {
        setError(err.message);
      }

  }; 

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Check Table Availability</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row justify-between my-3 items-center">
          <label htmlFor="date" className="w-[30%]">Date</label>
          <div className="w-[70%] ml-4">
            <DateReserve
              initialDate={dayjs()}
              onDateChange={(value: Dayjs) =>
                setDate(dayjs(value).format("YYYY-MM-DD"))
              }
            />
          </div>
        </div>

        {/* <div className="flex flex-row justify-between my-3 items-center">
        <label htmlFor="startTime" className="w-[30%]">Start Time</label>
        <div className="w-[70%] ml-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border-2 border-slate-300 w-full h-[40px] px-2 rounded-md focus:outline-none bg-white"
            required
          />
        </div>
      </div> */}

        <div className="flex flex-row justify-between my-3 items-center">
          <label htmlFor="Duration" className="w-[30%]">Duration (hours)</label>
          <input
            type="number"
            placeholder="Duration (hours)"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            min={1}
            className="border-2 border-slate-300 w-[70%] ml-4 h-[40px] px-2 rounded-md focus:outline-none bg-white"
            required
          />
        </div>

        <div className="flex flex-row justify-between my-3 items-center">
          <label htmlFor="Party_size" className="w-[30%]">Party size</label>
          <input
            type="number"
            placeholder="Party Size"
            value={partySize}
            onChange={(e) => setPartySize(parseInt(e.target.value))}
            min={1}
            className="border-2 border-slate-300 w-[70%] ml-4 h-[40px] px-2 rounded-md focus:outline-none bg-white"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#4AC9FF] w-[50%] text-white px-10 py-2 rounded-md hover:bg-[#0356a3] duration-300"
        >
          Check
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
} 