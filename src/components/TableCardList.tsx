import TableCard from "./TableCard";
// interface TableCardListProps {
//     tables: any[];
//     onSelectTable?: (table: any) => void;
// }

export default function TableCardList({
    tables,
    onTableSelect, // ฟังก์ชันที่ส่งไปยัง TableCard
}: {
    tables: any[];
    onTableSelect: (date: string, time: string, table: string) => void; // ฟังก์ชันที่จะรับข้อมูลเมื่อกดปุ่ม
}) {
    return (
        <div>
            {tables.length === 0 ? (
                <p>No available tables</p>
            ) : (
                <ul className="space-y-2">
                    {tables.map((table, index) => (
                        <li
                            key={index}
                            className="cursor-pointer"
                        >
                            <TableCard
                                date={table.date}
                                time={table.time}
                                table={table.availableTables.type}
                                onReserve={onTableSelect}  // ส่ง onTableSelect ไปยัง TableCard
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
    // <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
    //     <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
    //         <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
    //             {/* <TableCard date="2025-04-20" time="12:00 PM" table="Table 1" />
    //             <TableCard date="2025-04-20" time="12:30 PM" table="Table 2" />
    //             <TableCard date="2025-04-20" time="1:00 PM" table="Table 3" />
    //             <TableCard date="2025-04-20" time="1:30 PM" table="Table 4" /> */}
    //         </div>
    //     </div>
    // </div>
    // )
}