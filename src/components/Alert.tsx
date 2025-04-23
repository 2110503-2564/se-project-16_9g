'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AlertProps {
    message: string;
    resName?: string;
    name?: string;
    date?: string;
    time?: string;
    size?: string;
}


export default function Alert({message, resName, name, date, time, size}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  if (!visible) return null;

  return (
    <div className="relative mb-4 rounded-md bg-white p-6 border-2 border-green-400 text-black w-[600px] shadow-md space-y-4 font-mono">
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-3 text-3xl font-bold text-red-500"
        aria-label="Close"
      >
        ×
      </button>

      {/* Message */}
      <div className='py-5'>
        <span className="text-xl font-semibold text-green-500">{message}</span>
      </div>

      {/* Reservation Details */}
      {
        resName && name && date && time && size && (
          <div className="text-sm space-y-2">
            <p className="font-medium text-lg">{resName}</p>
            <p><span className="font-semibold">Name:</span> {name}</p>
            <p><span className="font-semibold">Date:</span> {date}</p>
            <p><span className="font-semibold">Time:</span> {time}</p>
            <p><span className="font-semibold">Table:</span> {size}</p>
          </div>
        )
      }

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="bg-green-400 w-[50%] text-white px-10 py-2 rounded-md hover:bg-green-500 duration-300"
          onClick={(e) => {e.preventDefault(); e.stopPropagation() ; router.push("/restaurants"); router.refresh()}}
        >
          Go to Home
        </button>
        <button
          className="bg-green-400 w-[50%] text-white px-10 py-2 rounded-md hover:bg-green-500 duration-300"
          onClick={(e) => {e.preventDefault(); e.stopPropagation() ; router.push("/myReservation"); router.refresh()}}
        >
          Go to My Reservations
        </button>
      </div>
    </div>
  );
}

