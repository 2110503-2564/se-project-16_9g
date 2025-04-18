import TableCard from "./TableCard";

export default function TableCardList() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">   
                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                    <TableCard date="2025-04-20" time="12:00 PM" table="Table 1" />
                    <TableCard date="2025-04-20" time="12:30 PM" table="Table 2" />
                    <TableCard date="2025-04-20" time="1:00 PM" table="Table 3" />
                    <TableCard date="2025-04-20" time="1:30 PM" table="Table 4" />
                </div>
            </div>  
        </div>    
    )
}