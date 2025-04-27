import axios from "axios";

export default async function getTransactions(token: string) {
    try {
        const response = await axios.get("http://localhost:5000/api/stb/pointtransactions/mytransactions", {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch transactions");
    }
}
