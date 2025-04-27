import axios from 'axios';


export default async function getTransaction(token: string) {

  try {
    const response = await axios.get("http://localhost:5000/api/stb/pointtransactions/mytransactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return null;
  }
}