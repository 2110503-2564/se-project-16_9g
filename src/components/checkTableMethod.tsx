import React, { useState } from 'react';
import getTableBookings from '@/libs/checkTable';

export default function CheckTable() {
    const [result, setResult] = useState<string>('');

  const handleCheckTable = async () => {
    try{
    const data = await getTableBookings();
    console.log(data);

    if (data.isAvailable) {
      alert(`Tables are available`);
      setResult(`Tables are available`);
    } else {
      alert(`No tables available`);
      setResult(`No tables available`);
    }
        }
    catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Check Table Availability</h1>
      <button
        onClick={handleCheckTable}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Table
      </button>
      {result && <p className="mt-4">{result}</p>}
    </div>
  );

};


