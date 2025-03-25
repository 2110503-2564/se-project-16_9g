export default async function editReservation(userid: string, token:string, currentPassword:string,
    newPassword:string
) {
    try {
        const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/auth/changepassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword
            }),
        });

        if (!response.ok  ) {
            throw new Error("Failed to make reservation");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || "Server error");
    }
}
