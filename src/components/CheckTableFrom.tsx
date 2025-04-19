"use client";

import React, { useState } from "react";
import checkAvailableTables from "@/libs/checkAvaliableTable";
import DateReserve from "./DateReserve";
import dayjs, { Dayjs } from "dayjs";


export default function CheckTableForm({ restaurantId, token }: { restaurantId: string, token: string }) {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [partySize, setPartySize] = useState(1);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResults([]);


    // alert(
    //   `📋 ข้อมูลที่ส่งไป:\n\n` +
    //   `📅 วันที่: ${date}\n` +
    //   `⏰ ระยะเวลา: ${duration} ชั่วโมง\n` +
    //   `👥 จำนวนคน: ${partySize} คน\n` +
    //   `🏢 ร้าน: ${restaurantId}`
    // );

    try {
      const response = await checkAvailableTables(
        restaurantId,
        date,
        duration,
        partySize,
        token
      );

      if (response.success) {
        // alert(response.data);
        setResults(response.data);
      } else {
        setError(response.message || "No tables available.");
      }
    } catch (err: any) {
      setError(err.message);
      // alert("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Check Table Availability</h2>
      <h3 className="text-xl font-bold mb-4">{restaurantId}</h3>
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

      {/* {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
          <ul className="space-y-2">
            {results.map((slot, index) => (
              <li key={index} className="p-2 border rounded">
                <span className="font-medium">{slot.time}</span> —{" "}
                {slot.availableTables.amount} {slot.availableTables.type} table(s)
              </li>
            ))}
          </ul>
        </div>
      )} */}

    </div>
  );
}