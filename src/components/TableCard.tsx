export default function TableCard({
    date,
    time,
    table,
    onReserve // เพิ่ม prop onReserve เพื่อรับฟังก์ชันที่เรียกเมื่อกดปุ่ม
}: {
    date: string;
    time: string;
    table: string;
    onReserve: (date: string, time: string, table: string) => void; // ประกาศ prop onReserve
}) {
    // ฟังก์ชันที่เรียกเมื่อกดปุ่ม Reserve
    const handleReserve = () => {
        onReserve(date, time, table);
    };

    return (
        <div>
            <div className='relative w-auto h-auto px-10 py-5 bg-white rounded-lg 
            shadow-[0px_0px_8px_6px_rgba(0,0,0,0.15)]  m-5 flex flex-col items-center text-black'>
                <div className="flex flex-row items-center justify-center gap-5 ">
                    <span>{time}</span>
                    <span>{table}</span>
                    <button
                        onClick={handleReserve}
                        className="px-3 py-2 bg-sky-400 rounded-md text-white"
                    >
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
}
