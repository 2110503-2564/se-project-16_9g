import axios from "axios";

export async function getNotifications(token: string) {
    try {
        const response = await axios.get(`http://localhost:5000/api/stb/notifications`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch notifications");
    }
}

export async function markNotificationAsRead(token: string) {
    try {
        await axios.put(`http://localhost:5000/api/stb/notifications/mark-all`,
            {}, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
    } catch (error) {
        throw new Error('Failed to mark notification as read');
    }
}

