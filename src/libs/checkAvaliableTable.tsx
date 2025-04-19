import axios from "axios";

export default async function checkAvailableTables(
  restaurantId: string,
  date: string,
  duration: number,
  partySize: number,
  token: string
) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/stb/restaurants/${restaurantId}/available-tables`,
      {
        params: {
          date,
          duration,
          partySize
        },
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to check available tables");
  }
}
