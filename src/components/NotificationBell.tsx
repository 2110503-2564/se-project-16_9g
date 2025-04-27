'use client';

import { useEffect, useState } from 'react';
import { getNotifications, markNotificationAsRead } from '@/libs/getNotifications';
import { BellIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Make sure axios is installed

interface Notification {
    _id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function NotificationBell() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (session?.user?.token) {
            fetchData();
        }
    }, [session?.user?.token]);

    const fetchData = async () => {
        if(session?.user.token) {
            try {
                const noti = await getNotifications(session.user.token);
                const sortedNoti = noti.data.sort((a: any, b: any) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setNotifications(sortedNoti);
                const unread = sortedNoti.filter((n: any) => !n.isRead).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    };

    async function handleBellClick() {
        if(session?.user.token) {
            try {
                // Mark all notifications as read
                await markNotificationAsRead(session.user.token);
    
                setUnreadCount(0); // Reset the badge counter
                setOpen(false); // Close dropdown if open
                router.push('/notifications'); // Navigate to notifications page
            } catch (error) {
                console.error('Failed to mark all notifications as read:', error);
            }

        }

    }

    return (
        <div className="relative">
            <button onClick={handleBellClick} className="relative">
                <BellIcon className="h-6 w-6 text-white" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Optional: dropdown preview if you want */}
            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
                    <h4 className="text-md font-semibold mb-2">Notifications</h4>
                    {notifications.length === 0 ? (
                        <p className="text-gray-500 text-sm">No notifications</p>
                    ) : (
                        <ul className="max-h-60 overflow-y-auto">
                            {notifications.map(notification => (
                                <li key={notification._id} className="text-sm mb-2">
                                    {notification.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
