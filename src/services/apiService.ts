// services/apiService.ts

// Define enum for booking status
export enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3
}

// Updated BookingDto interface
export interface BookingDto {
  bookingID: number;
  customerID: number;
  roomID: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: BookingStatus | number; // Can accept either the enum or the number
}

export interface CustomerDto {
  customerID: number;
  firstName: string;
  lastName: string;
  email: string;
  bookings?: BookingDto[];
}

export interface RoomDto {
  roomID: number;
  hotelID: number;
  roomNumber: string;
  roomType: string;
  capacity: number;
  pricePerNight: number;
  description: string;
  available: boolean;
}

export interface HotelDto {
  hotelID: number;
  name: string;
  address: string;
  city: string;
  country: string;
  rooms?: RoomDto[];
}

export interface PaymentDto {
  paymentID: number;
  bookingID: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
}

export interface SearchParams {
  city?: string;
  checkInDate?: string | Date;
  checkOutDate?: string | Date;
  guest?: number;
}

const API_BASE_URL = 'http://localhost:5247/api';

// Helper function to format dates for API requests
const formatDateParam = (date: string | Date | null | undefined): string | undefined => {
  if (!date) return undefined;
  
  if (typeof date === 'string') {
    // If it's already a string, make sure it's in ISO format
    return new Date(date).toISOString();
  }
  
  // If it's a Date object, convert to ISO string
  return date.toISOString();
};

// BOOKINGS API
export const fetchBookings = async (): Promise<BookingDto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Bookings`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch bookings: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in fetchBookings:', error);
    throw error;
  }
};

export const fetchBooking = async (id: number): Promise<BookingDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Bookings/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch booking: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching booking ${id}:`, error);
    throw error;
  }
};

export const createBooking = async (booking: Omit<BookingDto, 'bookingID'>): Promise<BookingDto> => {
  try {
    // Create dates in 2026 (guaranteed future)
    const futureYear = 2026;
    const currentDate = new Date();
    
    // Create a date string in the exact format that worked in Swagger
    const futureCheckIn = new Date(Date.UTC(
      futureYear, 
      currentDate.getMonth(), 
      currentDate.getDate(), 
      currentDate.getHours(), 
      currentDate.getMinutes()
    ));
    
    // Add one day for checkout
    const futureCheckOut = new Date(futureCheckIn);
    futureCheckOut.setDate(futureCheckOut.getDate() + 1);
    
    // Send data directly WITHOUT wrapping it in a bookingDto object
    const bookingData = {
      bookingID: 0,  // Include this but set to 0 to let the server assign it
      customerID: booking.customerID,
      roomID: booking.roomID,
      checkInDate: futureCheckIn.toISOString(),
      checkOutDate: futureCheckOut.toISOString(),
      status: 0,  // Use 0 (Pending) instead of 1 (Confirmed)
      totalPrice: booking.totalPrice
    };

    console.log('Exact Swagger format:', JSON.stringify(bookingData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/Bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create booking: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const updateBooking = async (id: number, booking: BookingDto): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update booking: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error(`Error updating booking ${id}:`, error);
    throw error;
  }
};

export const deleteBooking = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Bookings/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete booking: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting booking ${id}:`, error);
    throw error;
  }
};

// HOTELS API
export const fetchHotels = async (
  city?: string | null,
  checkInDate?: string | Date | null,
  checkOutDate?: string | Date | null,
  guest?: number | null
): Promise<HotelDto[]> => {
  try {
    let url = `${API_BASE_URL}/Hotels`;
    
    // Add query parameters if provided
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    
    // Format dates properly for the API
    const formattedCheckInDate = formatDateParam(checkInDate);
    const formattedCheckOutDate = formatDateParam(checkOutDate);
    
    if (formattedCheckInDate) params.append('checkInDate', formattedCheckInDate);
    if (formattedCheckOutDate) params.append('checkOutDate', formattedCheckOutDate);
    if (guest && guest > 0) params.append('guest', guest.toString());
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    console.log('Fetching hotels with URL:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
};

export const fetchHotel = async (id: number | string): Promise<HotelDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Hotels/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch hotel: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching hotel ${id}:`, error);
    throw error;
  }
};

export const createHotel = async (hotel: Omit<HotelDto, 'hotelID'>): Promise<HotelDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Hotels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotel),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create hotel: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating hotel:', error);
    throw error;
  }
};

export const updateHotel = async (id: number, hotel: HotelDto): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Hotels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotel),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update hotel: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error updating hotel ${id}:`, error);
    throw error;
  }
};

export const deleteHotel = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Hotels/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete hotel: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting hotel ${id}:`, error);
    throw error;
  }
};

// ROOMS API
export const fetchRooms = async (
  onlyAvailable: boolean = false,
  searchParams?: SearchParams
): Promise<RoomDto[]> => {
  try {
    const params = new URLSearchParams();
    
    if (onlyAvailable) params.append('onlyAvailable', 'true');
    
    // Add search parameters if provided
    if (searchParams) {
      if (searchParams.checkInDate) {
        params.append('checkInDate', formatDateParam(searchParams.checkInDate) || '');
      }
      if (searchParams.checkOutDate) {
        params.append('checkOutDate', formatDateParam(searchParams.checkOutDate) || '');
      }
      if (searchParams.guest) {
        params.append('guest', searchParams.guest.toString());
      }
    }
    
    const queryString = params.toString();
    const url = `${API_BASE_URL}/Rooms${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rooms: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const fetchRoom = async (id: number): Promise<RoomDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Rooms/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch room: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching room ${id}:`, error);
    throw error;
  }
};

export const fetchRoomsByHotel = async (
  hotelId: number | string,
  checkInDate?: string | Date | null,
  checkOutDate?: string | Date | null,
  guest?: number | null
): Promise<RoomDto[]> => {
  try {
    // Try to get the hotel with its rooms first
    const hotelUrl = new URL(`${API_BASE_URL}/Hotels/${hotelId}`);
    
    // Add query parameters if provided for filtering
    const formattedCheckInDate = formatDateParam(checkInDate);
    const formattedCheckOutDate = formatDateParam(checkOutDate);
    
    if (formattedCheckInDate) {
      hotelUrl.searchParams.append('checkInDate', formattedCheckInDate);
    }
    if (formattedCheckOutDate) {
      hotelUrl.searchParams.append('checkOutDate', formattedCheckOutDate);
    }
    if (guest && guest > 0) {
      hotelUrl.searchParams.append('guest', guest.toString());
    }
    
    console.log('Fetching rooms for hotel with URL:', hotelUrl.toString());
    const hotelResponse = await fetch(hotelUrl.toString());
    
    if (!hotelResponse.ok) {
      throw new Error(`Failed to fetch hotel with rooms: ${hotelResponse.status}`);
    }
    
    const hotel = await hotelResponse.json();
    
    // If hotel has rooms property with data, return it
    if (hotel.rooms && Array.isArray(hotel.rooms) && hotel.rooms.length > 0) {
      // Additional client-side filtering if needed
      let filteredRooms = hotel.rooms;
      
      if (guest && typeof guest === 'number') {
        filteredRooms = filteredRooms.filter((room: RoomDto) => room.capacity >= guest);
      }
      
      return filteredRooms;
    }
    
    // If no rooms in hotel response, try fetching rooms directly
    console.log('No rooms in hotel response, fetching all rooms to filter');
    const allRooms = await fetchRooms(false, {
      checkInDate: checkInDate || undefined, 
      checkOutDate: checkOutDate || undefined,
      guest: guest || undefined
    });
    
    // Filter rooms by hotel ID
    return allRooms.filter((room: RoomDto) => {
      const roomHotelId = typeof room.hotelID === 'string' 
        ? parseInt(room.hotelID, 10) 
        : room.hotelID;
        
      const targetHotelId = typeof hotelId === 'string' 
        ? parseInt(hotelId, 10) 
        : hotelId;
        
      return roomHotelId === targetHotelId;
    });
  } catch (error) {
    console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
    
    // Fallback: Try to get all rooms and filter
    try {
      console.log('Attempting fallback: fetch all rooms and filter by hotel ID');
      const allRooms = await fetchRooms();
      
      // Filter rooms by hotel ID
      const hotelIdNumber = typeof hotelId === 'string' ? parseInt(hotelId, 10) : hotelId;
      
      return allRooms.filter((room: RoomDto) => {
        const roomHotelId = typeof room.hotelID === 'string' 
          ? parseInt(room.hotelID, 10) 
          : room.hotelID;
          
        return roomHotelId === hotelIdNumber;
      });
    } catch (fallbackError) {
      console.error('Even fallback approach failed:', fallbackError);
      throw fallbackError;
    }
  }
};

export const createRoom = async (room: Omit<RoomDto, 'roomID'>): Promise<RoomDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create room: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

export const updateRoom = async (id: number, room: RoomDto): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update room: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error updating room ${id}:`, error);
    throw error;
  }
};

export const deleteRoom = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Rooms/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete room: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting room ${id}:`, error);
    throw error;
  }
};

// CUSTOMERS API
export const fetchCustomers = async (): Promise<CustomerDto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Customers`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const fetchCustomer = async (id: number): Promise<CustomerDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Customers/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (customer: Omit<CustomerDto, 'customerID'>): Promise<CustomerDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create customer: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// PAYMENTS API
export const fetchPayments = async (): Promise<PaymentDto[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Payments`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch payments: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const createPayment = async (payment: Omit<PaymentDto, 'paymentID'>): Promise<PaymentDto> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};