interface TransactionBoxProps {
  transactionID: string;
  Date: string;
  UserId: string;
  Username: string;
  email: string;
  amount: number;
  message: string;
  type: "earn" | "redeem";
}

export default function TransactionBox({
  transactionID,
  Date,
  UserId,
  Username,
  email,
  type,
  amount,
  message
}: TransactionBoxProps) {
  return (
    <div className={`relative grid grid-cols-8 justify-center text-center 
          ${type === "earn" ? "bg-green-100" : "bg-red-100"} my-2 p-3 `}>
      <div className="col-span-2">{transactionID}</div>
      <div>
        <div>{Date.split(',')[0]}</div>
        <div>{Date.split(',')[1]}</div>
      </div>
      <div className="col-span-2">
        <div>{UserId}</div>
        <div className="text-sm">@{Username}</div>
      </div>
      <div className="col-span-2">{email}</div>
      <div className="flex flex-col justify-center ">
        <div>{type === "earn" ? "+" : "-"}{amount}</div>
        <div className={`flex items-center justify-center absolute top-1/2 right-0 transform 
            -translate-y-1/2 rotate-90 ${type === "earn" ? "bg-green-500" : "bg-red-500"} text-white text-sm px-2 py-1 rounded-md`}>
          {type === "earn" ? "Earn" : "Redeem"}
        </div>
      </div>
    </div>
  )

};