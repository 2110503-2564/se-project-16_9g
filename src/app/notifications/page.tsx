'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { getNotifications, markNotificationAsRead } from "@/libs/getNotifications";
import { BellIcon } from 'lucide-react';

export default function NotificationPage() {

    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);

    interface Notification {
        _id: string;
        message: string;
        title: string;
        isRead: boolean;
        createdAt: string;
        type: "earn" | "redeem"
    }

    const fetchData = async () => {
        if (!session?.user?.token) {
            console.warn("No token found.");
            return;
        }

        try {
            const noti = await getNotifications(session.user.token);
            const sortedNoti = noti.data.sort((a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setNotifications(sortedNoti);
        } catch (error) {
            console.error("Error in fetchData:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [session?.user?.token]);
    console.log(notifications);




    return (
        <div className="p-6">
            <div className="bg-sky-400 text-white text-lg font-semibold py-3 px-6 rounded-md mb-6">
                New notification
            </div>

            <div className="flex flex-col gap-4">
                {notifications.map((notification) => (
                    <div
                        key={notification._id}
                        className={`flex justify-between items-center border rounded-lg p-4 ${notification.type === 'earn' ? 'border-green-500' : 'border-red-500'
                            }`}
                    >
                        <div>
                            <div className="font-semibold">
                                {notification.message}
                            </div>
                            {/* <div className="text-gray-500 text-sm mt-1">
                                {notification.type === 'earn' ? 'From' : 'Redeem at'} (Restaurant Name)
                            </div> */}
                            <div className="text-gray-500 text-sm">
                                {notification.type === 'earn' ? 'Received on' : 'Redeem on'} ({new Date(notification.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' })})
                            </div>
                        </div>
                        <div
                            className={`w-5 h-5 rounded-full ${notification.type === 'earn' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}