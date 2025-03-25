import axios from "axios";

export default async function AddNewRestaurant(
    token: string, 
    resName: string, 
    address: string, 
    district: string,
    province: string, 
    postalcode: string, 
    picture: string, 
    tel: string, 
    region: string, 
    opentime: string, 
    closetime: string
) {
    try {
        const response = await axios.post(
            `https://restaurant-api-fawn.vercel.app/api/stb/restaurants`,
            {
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
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to add restaurant");
    }
}
