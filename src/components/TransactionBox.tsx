interface TransactionBoxProps {
  transactionID: string;
  Date: string;
  UserId: string;
  Username: string;
  email: string;
  type: "earn" | "redeem";
}

export default function TransactionBox({
  transactionID,
  Date,
  UserId,
  Username,
  email,
  type
}: TransactionBoxProps) {
  return (
    type === "earn"
      ? (
        <div className="relative flex flex-col gap-3 justify-between mt-10 px-10 py-8 bg-white rounded-lg 
                w-fit mx-auto w-full border-2 border-green-500 " >
          <div className="absolute right-0 top-0 px-[30px] py-2 bg-green-500 rounded-tr-md 
                    text-white">Receive</div>
          <div className="flex flex-row gap-3 items-start ">
            <div>Transaction ID {transactionID}</div>
            <div>Date {Date}</div>
          </div>
          <div className="flex flex-row gap-3 items-start ">
            <div>User ID {UserId}</div>
            {/* <div>Username {Username}</div>
            <div>email {email}</div> */}
          </div>
          <div className="flex flex-row gap-3 items-start ">
            {/* <div>Restaurant Name</div> */}
            <div>Username {Username}</div>
            <div>email {email}</div>
          </div>
        </div>
      )

      :
      (
        <div className="relative flex flex-col gap-3 justify-between mt-10 px-10 py-8 bg-white rounded-lg 
                w-fit mx-auto w-full border-2 border-red-500 " >
          <div className="absolute right-0 top-0 px-[30px] py-2 bg-red-500 rounded-tr-md 
                    text-white">Redeem</div>
          <div className="flex flex-row gap-3 items-start ">
            <div>Transaction ID</div>
            <div>Date</div>
          </div>
          <div className="flex flex-row gap-3 items-start ">
            <div>User ID</div>
          </div>
          <div className="flex flex-row gap-3 items-start ">
            <div>Username {Username}</div>
            <div>email {email}</div>
            {/* <div>Restaurant Name</div> */}
          </div>
        </div>
      )
  );
};