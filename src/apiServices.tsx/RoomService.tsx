import axios from "axios";

const API_BASE_URL = "http://localhost:5247/api";

export const GetAllRooms = async (
  onlyAvailable: boolean = false
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Rooms`, {
      params: {
        onlyAvailable
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms: ", error);
    throw error;
  }
};

export const GetRoomById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching room ${id}: `, error);
    throw error;
  }
};

export const GetRoomsByHotelId = async (
  hotelId: number,
  checkInDate?: string,
  checkOutDate?: string,
  guest?: number
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Hotels/${hotelId}`, {
      params: {
        checkInDate,
        checkOutDate,
        guest,
      },
    });
    
    if (response.data.rooms && Array.isArray(response.data.rooms)) {
      return response.data.rooms;
    }
    
    return [];
  } catch (error) {
    console.error(`Error fetching rooms for hotel ${hotelId}: `, error);
    throw error;
  }
};