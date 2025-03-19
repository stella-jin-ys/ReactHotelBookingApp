// components/AvailabilityComponent.tsx
import React, { useState, useEffect, useCallback } from 'react';
import RoomCard from './RoomCard';
import { GetRoomsByHotelId } from '../apiServices.tsx/RoomService';
import { GetAllBookings } from '../apiServices.tsx/BookingService';

// Define types
type AvailabilityComponentProps = {
  hotelId: string | number | null;
  initialCheckInDate?: Date;
  initialCheckOutDate?: Date;
  initialGuests?: number;
}

type Booking = {
  roomID: number;
  checkInDate: string;
  checkOutDate: string;
  status?: number;
}

type RoomResponse = {
  roomID: number;
  roomType?: string;
  description?: string;
  pricePerNight: number;
  capacity?: number;
  roomNumber: string | number;
}

type RoomDisplayData = {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  roomNumber: string | number;
  amenities: string[];
  thumbnail: string;
  available: boolean;
  roomType: string;
}

const AvailabilityComponent: React.FC<AvailabilityComponentProps> = ({ 
  hotelId, 
  initialCheckInDate, 
  initialCheckOutDate, 
  initialGuests 
}) => {
  // Initialize state with provided values or defaults
  const [checkInDate, setCheckInDate] = useState<Date>(
    initialCheckInDate || new Date()
  );
  const [checkOutDate, setCheckOutDate] = useState<Date>(
    initialCheckOutDate || new Date(Date.now() + 86400000) // Tomorrow
  );
  const [guests, setGuests] = useState<number>(
    initialGuests || 2
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<RoomDisplayData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get amenities based on room type
  const getAmenitiesByRoomType = (roomType?: string): string[] => {
    const baseAmenities = ["Free WiFi", "Air conditioning", "Private bathroom"];
    
    if (!roomType) return baseAmenities;
    
    const type = roomType.toLowerCase();
    if (type.includes('deluxe')) {
      return [...baseAmenities, "Flat-screen TV", "Minibar", "Coffee machine"];
    } else if (type.includes('suite')) {
      return [...baseAmenities, "Flat-screen TV", "Minibar", "Balcony", "Coffee machine", "Sofa"];
    } else if (type.includes('executive')) {
      return [...baseAmenities, "Flat-screen TV", "Minibar", "Workspace", "Coffee machine"];
    } else {
      return [...baseAmenities, "Flat-screen TV"];
    }
  };

  // Helper function to get a thumbnail image based on room type
  const getRoomThumbnail = (roomType?: string): string => {
    if (!roomType) return "https://images.unsplash.com/photo-1505693794498-15c6c3f9dc2a?q=80&w=200";
    
    const type = roomType.toLowerCase();
    if (type.includes('deluxe')) {
      return "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200";
    } else if (type.includes('suite')) {
      return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=200";
    } else if (type.includes('executive')) {
      return "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=200";
    } else {
      return "https://images.unsplash.com/photo-1505693794498-15c6c3f9dc2a?q=80&w=200";
    }
  };

  // Fetch bookings when component loads
  useEffect(() => {
    const loadBookings = async (): Promise<void> => {
      try {
        const bookingData = await GetAllBookings();
        setBookings(bookingData);
      } catch (err) {
        console.error('Error loading bookings:', err);
      }
    };
    
    loadBookings();
  }, []);

  // Check if a room is available for the selected date range
  const isRoomAvailable = useCallback((roomId: number, checkIn: Date, checkOut: Date): boolean => {
    // Convert dates to comparable format
    const checkInTime = new Date(checkIn).getTime();
    const checkOutTime = new Date(checkOut).getTime();
    
    // Find any overlapping bookings for this room
    const overlappingBookings = bookings.filter(booking => {
      // Skip if it's not for this room
      if (booking.roomID !== roomId) return false;
      
      // Skip if booking is cancelled (status 2)
      if (booking.status === 2) return false;
      
      // Convert booking dates to comparable format
      const bookingCheckIn = new Date(booking.checkInDate).getTime();
      const bookingCheckOut = new Date(booking.checkOutDate).getTime();
      
      // Check for any overlap between the two date ranges
      return (
        (checkInTime >= bookingCheckIn && checkInTime < bookingCheckOut) || // Check-in during existing booking
        (checkOutTime > bookingCheckIn && checkOutTime <= bookingCheckOut) || // Check-out during existing booking
        (checkInTime <= bookingCheckIn && checkOutTime >= bookingCheckOut) // Existing booking within selected dates
      );
    });
    
    // Room is available if there are no overlapping bookings
    return overlappingBookings.length === 0;
  }, [bookings]);

  // Fetch rooms when hotel or dates change
  useEffect(() => {
    const loadRooms = async (): Promise<void> => {
      if (!hotelId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const hotelRooms: RoomResponse[] = await GetRoomsByHotelId(
          typeof hotelId === 'string' ? parseInt(hotelId) : hotelId as number,
          checkInDate.toISOString(),
          checkOutDate.toISOString(),
          guests
        );
        
        if (hotelRooms.length === 0) {
          setError('No rooms available for this hotel.');
          setRooms([]);
          return;
        }
        
        // Transform room data to match RoomCard component expectations
        const transformedRooms: RoomDisplayData[] = hotelRooms.map(room => {
          // Check if room is available for selected dates
          const available = isRoomAvailable(room.roomID, checkInDate, checkOutDate);
          const roomType = room.roomType || 'Standard Room';
          
          return {
            id: room.roomID,
            name: roomType,
            roomType: roomType,
            description: room.description || 'Comfortable stay with essential amenities',
            price: room.pricePerNight,
            currency: "SEK",
            capacity: room.capacity || 2,
            roomNumber: room.roomNumber,
            amenities: getAmenitiesByRoomType(room.roomType),
            thumbnail: getRoomThumbnail(room.roomType),
            available: available
          };
        });
        
        setRooms(transformedRooms);
      } catch (err) {
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadRooms();
  }, [hotelId, checkInDate, checkOutDate, bookings, guests, isRoomAvailable]);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Calculate nights between check-in and check-out
  const calculateNights = (): number => {
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Handle date changes
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setCheckInDate(newDate);
    
    // If check-out date is earlier than or equal to the new check-in date,
    // set check-out date to the day after check-in
    if (checkOutDate <= newDate) {
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOutDate(nextDay);
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setCheckOutDate(newDate);
  };

  return (
    <div id="info" className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Availability</h2>
      
      {/* Date and guest selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-red-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input 
            type="date" 
            className="w-full p-2 border border-gray-300 rounded"
            value={checkInDate.toISOString().split('T')[0]}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleCheckInChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input 
            type="date" 
            className="w-full p-2 border border-gray-300 rounded"
            value={checkOutDate.toISOString().split('T')[0]}
            min={new Date(checkInDate.getTime() + 86400000).toISOString().split('T')[0]}
            onChange={handleCheckOutChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-4 text-sm">
        <p>Showing room availability for <span className="font-medium">{formatDate(checkInDate)}</span> to <span className="font-medium">{formatDate(checkOutDate)}</span></p>
      </div>
      
      {/* Room List */}
      {loading ? (
        <div className="py-6 text-center">
          <p>Loading available rooms...</p>
        </div>
      ) : error ? (
        <div className="py-6 text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : rooms.length === 0 ? (
        <div className="py-6 text-center">
          <p>No rooms available for the selected hotel.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms
            // Filter rooms based on capacity meeting or exceeding requested guests
            .filter(room => room.capacity >= guests)
            .map(room => (
              <RoomCard 
                key={room.id} 
                room={room} 
                nights={calculateNights()}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                guestCount={guests}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AvailabilityComponent;