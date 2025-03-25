"use client"
import { useState } from "react";
import AddNewRestaurant from "@/libs/addRestaurant";
import TimeReserve from "@/components/TimeReserve";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddRestaurant() {

    const {data:session} = useSession();
    if(!session) return null;
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        district: "",
        province: "",
        postalcode: "",
        picture: "",
        tel: "",
        region: "",
        opentime: openTime,
        closetime: closeTime,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    

    const router = useRouter();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            
            const response = await AddNewRestaurant(
                session.user.token,
                formData.name,
                formData.address,
                formData.district,
                formData.province,
                formData.postalcode,
                formData.picture,
                formData.tel,
                formData.region,
                openTime,
                closeTime
            );

            setMessage("Restaurant added successfully!");
            router.push('/restaurants')
            router.refresh();
            setFormData({
                name: "", address: "", district: "", province: "", postalcode: "",
                picture: "", tel: "", region: "", opentime: "", closetime: ""
            });
        } catch (error: any) {
            setMessage(error.message || "Failed to add restaurant");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[550px] my-10 mx-auto p-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full shadow-[0px_0px_8px_4px_rgba(0,0,0,0.15)]
            justify-center items-center rounded-lg p-6 ">
                <div className="py-3"><h1 className="text-2xl">Add Restaurant</h1></div>
                <div className="flex flex-col text-lg ">
                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="name">Name</label>
                        <input className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                            type="text" name="name" id="name"
                            value={formData.name} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                        value={formData.address} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="district">District</label>
                        <input type="text" name="district" id="district"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                        value={formData.district} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="province">Province</label>
                        <input type="text" name="province" id="province"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                        value={formData.province} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="postalcode">Postalcode</label>
                        <input type="text" name="postalcode" id="postalcode"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2" 
                        value={formData.postalcode} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="picture">Picture</label>
                        <input type="text" name="picture" id="picture"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                        value={formData.picture} onChange={handleChange}/>
                    </div >
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="tel">Tel</label>
                        <input type="text" name="tel" id="tel"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                        value={formData.tel} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="region">Region</label>
                        <input type="text" name="region" id="region"
                            className="border border-2 border-slate-300 h-[40px] rounded-md
                        focus:outline-none p-2"
                        value={formData.region} onChange={handleChange}/>
                    </div>
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="opentime">Open Time</label>
                        <TimeReserve
                            initialTime={dayjs('2022-04-17T10:00')}
                            onTimeChange={(value: Dayjs) => setOpenTime(value.format("HH:mm:ss"))}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-5 my-2 items-center">
                        <label htmlFor="closetime">Close Time</label>
                        <TimeReserve
                            initialTime={dayjs('2022-04-17T10:00')}
                            onTimeChange={(value: Dayjs) => setCloseTime(value.format("HH:mm:ss"))}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className="bg-[#4AC9FF] text-white px-3 py-2 rounded-lg 
                    hover:bg-[#0356a3] duration-300 ">
                        Add Restaurant
                    </button>
                </div>
            </form>
        </div>
    );
}