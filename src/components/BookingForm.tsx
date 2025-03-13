import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../services/apiService';

interface BookingFormProps {
  roomId: number;
  roomName: string;
  roomType: string;
  checkInDate: Date;
  checkOutDate: Date;
  pricePerNight: number;
  guestCount: number;
  onClose?: () => void;
  onSuccess?: () => void;
}

// Define booking status enum to match backend
enum BookingStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3
}

const BookingForm: React.FC<BookingFormProps> = ({
  roomId,
  roomName,
  roomType,
  checkInDate: initialCheckInDate,
  checkOutDate: initialCheckOutDate,
  pricePerNight,
  guestCount,
  onClose,
  onSuccess
}) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Create state to store the potentially adjusted dates
  const [checkInDate, setCheckInDate] = useState<Date>(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState<Date>(initialCheckOutDate);
  
  // Fixed customer ID for now (as specified, we're using User 1)
  const customerId = 1;
  
  // Ensure dates are valid on component mount
  useEffect(() => {
    // Get today's date at midnight (to remove time component)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if initial check-in date is before today
    if (initialCheckInDate < today) {
      // Set check-in date to today
      setCheckInDate(today);
      
      // Ensure check-out date is at least one day after check-in
      const newCheckOutDate = new Date(today);
      newCheckOutDate.setDate(today.getDate() + 1);
      
      // If the initial check-out date is not valid with the new check-in date
      if (initialCheckOutDate <= today) {
        setCheckOutDate(newCheckOutDate);
      }
      
      console.log('Adjusted check-in date to today:', today);
    }
  }, [initialCheckInDate, initialCheckOutDate]);
  
  // Calculate night count and total price
  const nightCount = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = nightCount * pricePerNight;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a date for tomorrow to ensure we're in the future
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      // Use either the selected check-in date or tomorrow, whichever is later
      const safeCheckInDate = new Date(Math.max(checkInDate.getTime(), tomorrow.getTime()));
      
      // Ensure check-out date is at least one day after check-in
      const safeCheckOutDate = new Date(safeCheckInDate);
      safeCheckOutDate.setDate(safeCheckInDate.getDate() + 1);
      
      // Create booking payload
      const bookingData = {
        customerID: customerId,
        roomID: roomId,
        checkInDate: safeCheckInDate.toISOString(),
        checkOutDate: safeCheckOutDate.toISOString(),
        status: BookingStatus.Confirmed,
        totalPrice: totalPrice
      };
      
      console.log('Safe check-in date:', safeCheckInDate.toISOString());
      console.log('Safe check-out date:', safeCheckOutDate.toISOString());
      console.log('Full booking data being sent:', JSON.stringify(bookingData, null, 2));
      
      // Call API to create booking
      const response = await createBooking(bookingData);
      console.log('Booking created:', response);
      
      // Show success state
      setBookingSuccess(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Automatically redirect to a confirmation page after a delay
      setTimeout(() => {
        navigate(`/booking-confirmation/${response.bookingID}`);
      }, 2000);
    } catch (err: any) {
      console.error('Error creating booking:', err);
      const errorMessage = err.message && typeof err.message === 'string' && err.message.includes('Failed to create booking')
        ? err.message.split('-')[1]?.trim() || 'Failed to create booking. Please try again.'
        : 'Failed to create booking. Please try again.';
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Complete Your Booking</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {bookingSuccess ? (
        <div className="text-center py-8">
          <div className="text-green-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-4">Your reservation has been successfully made.</p>
          <p className="text-sm text-gray-500">Redirecting to confirmation page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Date selector */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{roomName}</h3>
            <p className="text-gray-600 text-sm mb-4">{roomType}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded"
                
                onChange={(e) => {
                  const newDate = new Date(e.target.value);
                  setCheckInDate(newDate);
                  
                  // If check-out date is before or equal to new check-in date
                  if (checkOutDate <= newDate) {
                    const nextDay = new Date(newDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    setCheckOutDate(nextDay);
                  }
                }}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <input 
                type="date" 
                className="w-full p-2 border border-gray-300 rounded"
                value={checkOutDate.toISOString().split('T')[0]}
                min={new Date(checkInDate.getTime() + 86400000).toISOString().split('T')[0]}
                onChange={(e) => setCheckOutDate(new Date(e.target.value))}
              />
            </div>
          </div>
          
          {/* Guest information - simplified since we're using User 1 */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Guest Information</h3>
            <p className="text-gray-700">User 1 (Customer ID: {customerId})</p>
            <p className="text-gray-500 text-sm mt-1">Number of guests: {guestCount}</p>
          </div>
          
          {/* Price breakdown */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price Details</h3>
            <div className="border-t border-b py-3">
              <div className="flex justify-between mb-2">
                <span>{pricePerNight} SEK × {nightCount} nights</span>
                <span>{totalPrice} SEK</span>
              </div>
              <div className="font-bold flex justify-between pt-2 border-t border-dashed">
                <span>Total</span>
                <span>{totalPrice} SEK</span>
              </div>
            </div>
          </div>
          
          {/* Terms acceptance - not functional for now */}
          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" checked={true} readOnly className="mr-2" />
              <span className="text-sm text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md font-medium ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-pink text-white hover:bg-red-300'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;