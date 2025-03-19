import axios from "axios";

const API_BASE_URL = "http://localhost:5247/api";

export const GetAllBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    throw error;
  }
};

export const GetBookingById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking ${id}: `, error);
    throw error;
  }
};

export const CreateBooking = async (
  customerID: number,
  roomID: number,
  checkInDate: string,
  checkOutDate: string,
  totalPrice: number
) => {
  try {
    const bookingData = {
      bookingID: 0,
      customerID,
      roomID,
      checkInDate,
      checkOutDate,
      status: 0, // Pending
      totalPrice
    };
    
    const response = await axios.post(`${API_BASE_URL}/Bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking: ", error);
    throw error;
  }
};

export const UpdateBooking = async (
  id: number,
  customerID: number,
  roomID: number,
  checkInDate: string,
  checkOutDate: string,
  status: number,
  totalPrice: number
) => {
  try {
    const bookingData = {
      bookingID: id,
      customerID,
      roomID,
      checkInDate,
      checkOutDate,
      status,
      totalPrice
    };
    
    await axios.put(`${API_BASE_URL}/Bookings/${id}`, bookingData);
  } catch (error) {
    console.error(`Error updating booking ${id}: `, error);
    throw error;
  }
};

export const DeleteBooking = async (id: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/Bookings/${id}`);
  } catch (error) {
    console.error(`Error deleting booking ${id}: `, error);
    throw error;
  }
};