import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBooking, fetchRoom, fetchHotel } from '../services/apiService';
import { BookingDto, RoomDto, HotelDto } from '../services/apiService';

const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<BookingDto | null>(null);
  const [room, setRoom] = useState<RoomDto | null>(null);
  const [hotel, setHotel] = useState<HotelDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadBookingDetails = async () => {
      if (!bookingId) {
        setError('Booking ID is missing');
        setLoading(false);
        return;
      }
      
      try {
        // Fetch booking information
        const bookingData = await fetchBooking(parseInt(bookingId, 10));
        setBooking(bookingData);
        
        // Fetch room information
        const roomData = await fetchRoom(bookingData.roomID);
        setRoom(roomData);
        
        // Fetch hotel information
        const hotelData = await fetchHotel(roomData.hotelID);
        setHotel(hotelData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading booking details:', err);
        setError('Failed to load booking details');
        setLoading(false);
      }
    };
    
    loadBookingDetails();
  }, [bookingId]);
  
  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Calculate nights
  const calculateNights = () => {
    if (!booking?.checkInDate || !booking?.checkOutDate) return 0;
    
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink mx-auto mb-4"></div>
          <p>Loading your booking details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !booking || !room || !hotel) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error || 'Unable to retrieve booking information'}</p>
          <Link to="/" className="bg-pink text-white py-2 px-6 rounded-lg hover:bg-red-300">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-50 p-6 border-b">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-center text-gray-600">Thank you for your reservation. Your booking has been successfully confirmed.</p>
        </div>
        
        {/* Booking Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Booking Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-medium">{booking.bookingID}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">{booking.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">{formatDate(booking.checkInDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">{formatDate(booking.checkOutDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nights:</span>
                  <span className="font-medium">{calculateNights()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-medium">{booking.totalPrice} SEK</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-2">Accommodation Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel:</span>
                  <span className="font-medium">{hotel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium">{room.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Number:</span>
                  <span className="font-medium">{room.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                </div>
                <div>
                  <address className="not-italic text-right">
                    {hotel.address}<br />
                    {hotel.city}, {hotel.country}
                  </address>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guest Information */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Guest Information</h3>
            <p className="text-gray-600">Customer ID: {booking.customerID}</p>
            <p className="text-sm text-gray-500 mt-1">We're using a fixed customer (User 1) for now</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">Need help with your booking? Contact our support team.</p>
          <div className="space-x-4">
            <Link
              to={`/hotels/${hotel.hotelID}`}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Back to Hotel
            </Link>
            <Link
              to="/"
              className="bg-pink text-white py-2 px-4 rounded hover:bg-red-300"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;