export default async function userRegister(userEmail:string, userPassword:string, name:string, tel:string) {
    const response = await fetch("https://restaurant-api-fawn.vercel.app/api/stb/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: userEmail,
            password: userPassword,
            tel: tel,
            role: "user"
        }),
    })
    
    if(!response.ok) {
        throw new Error("Failed to register")
    }

    return await response.json();
}   