import axios from "axios";

export default async function EditRestaurantFunc(
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
    closetime: string,
    resid: string
) {
    try {
        const response = await axios.put(
            `http://localhost:5000/api/stb/restaurants/${resid}`,
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
        throw new Error(error.response?.data?.message || "Failed to update restaurant");
    }
}
