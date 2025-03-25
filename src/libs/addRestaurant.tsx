export default async function AddNewRestaurant(token:string, resName:string, address:string, district:string,
    province:string, postalcode:string, picture:string, tel:string, region:string, opentime:string, closetime:string
) {
    try {
        const response = await fetch(`https://restaurant-api-fawn.vercel.app/api/stb/restaurants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: resName,
                address: address,
                district: district,
                province: province,
                postalcode: postalcode,
                picture: picture,
                tel: tel,
                region: region,
                opentime: opentime,
                closetime: closetime
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to add restaurant");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message || "Server error");
    }
}
