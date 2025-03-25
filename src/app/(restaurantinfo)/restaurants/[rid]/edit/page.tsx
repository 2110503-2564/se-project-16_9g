"use client";
import { useState, useEffect } from "react";
import EditRestaurantFunc from "@/libs/editRestaurant";
import TimeReserve from "@/components/TimeReserve";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import getRestaurant from "@/libs/getRestaurant";
import { LinearProgress } from "@mui/material";

export default function EditRestaurant() {
    const router = useRouter();
    const [resData, setResData] = useState<any>(null);
    const [resName, setResName] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [postalcode, setPostalCode] = useState("");
    const [picture, setPicture] = useState("");
    const [tel, setTel] = useState("");
    const [region, setRegion] = useState("");
    const [openTime, setOpenTime] = useState<string>(dayjs().format("HH:mm:ss"));
    const [closeTime, setCloseTime] = useState<string>(dayjs().format("HH:mm:ss"));

    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const { data: session } = useSession();
    const params = useSearchParams();
    const rid = params.get("id");

    useEffect(() => {
        if (!session?.user.token || !rid) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getRestaurant(rid);
                if (res.data) {
                    setResData(res.data);
                    setResName(res.data.name);
                    setAddress(res.data.address);
                    setDistrict(res.data.district);
                    setProvince(res.data.province);
                    setPostalCode(res.data.postalcode);
                    setPicture(res.data.picture);
                    setTel(res.data.tel);
                    setRegion(res.data.region);
                    setOpenTime(res.data.opentime);
                    setCloseTime(res.data.closetime);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setMessage("Error fetching restaurant details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session?.user.token, rid]);

    // Handle form submission
    const handleEditRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user.token || !rid) return;

        setSaving(true);
        setMessage("");

        try {
            await EditRestaurantFunc(
                session.user.token,
                resName,
                address,
                district,
                province,
                postalcode,
                picture,
                tel,
                region,
                openTime,
                closeTime,
                rid
            );

            alert("Restaurant updated successfully!");
            router.push("/restaurants");
            router.refresh();
        } catch (error: any) {
            setMessage(error.message || "Failed to edit restaurant");
        } finally {
            setSaving(false);
        }
    };
    if (loading) {
            return (
                <div className="w-full text-center">
                    <p>Loading...</p>
                    <LinearProgress />
                </div>
            );
        }
    
        if (!resData) {
            return (
                <div className="w-full text-center text-gray-500">
                    <h1>Restaurant not found.</h1>
                </div>
            );
        }

    return (
        <div className="w-[550px] my-10 mx-auto p-3 font-mono ">
            <form
                onSubmit={handleEditRestaurant}
                className="flex flex-col gap-3 w-full shadow-[0px_0px_8px_4px_rgba(0,0,0,0.15)]
                justify-center items-center rounded-lg p-6"
            >
                <div className="py-3">
                    <h1 className="text-2xl">Edit Restaurant</h1>
                </div>

                {message && <p className="text-red-500">{message}</p>}

                <div className="flex flex-col text-lg">
                    <div className="flex flex-row justify-between my-2  items-center ">
                        <label htmlFor="name">Name</label>
                        <input
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            type="text"
                            id="name"
                            value={resName}
                            onChange={(e) => setResName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="district">District</label>
                        <input
                            type="text"
                            id="district"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="province">Province</label>
                        <input
                            type="text"
                            id="province"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="postalcode">Postalcode</label>
                        <input
                            type="text"
                            id="postalcode"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={postalcode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="picture">Picture</label>
                        <input
                            type="text"
                            id="picture"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={picture}
                            onChange={(e) => setPicture(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="tel">Tel</label>
                        <input
                            type="text"
                            id="tel"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label htmlFor="region">Region</label>
                        <input
                            type="text"
                            id="region"
                            className="border border-2 border-slate-300 h-[40px] rounded-md focus:outline-none p-2"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label>Open Time</label>
                        <TimeReserve
                            initialTime={dayjs(openTime, "HH:mm 00")}
                            onTimeChange={(value: Dayjs) => setOpenTime(value.format("HH:mm:ss"))}
                        />
                    </div>

                    <div className="flex flex-row justify-between my-2 items-center">
                        <label>Close Time</label>
                        <TimeReserve
                            initialTime={dayjs(closeTime, "HH:mm 00")}
                            onTimeChange={(value: Dayjs) => setCloseTime(value.format("HH:mm:ss"))}
                        />
                    </div>
                </div>

                <button type="submit" className="bg-[#4AC9FF] text-white px-3 py-2 rounded-lg hover:bg-[#0356a3] duration-300">
                    {saving ? "Saving..." : "Edit Restaurant"}
                </button>
            </form>
        </div>
    );
}
