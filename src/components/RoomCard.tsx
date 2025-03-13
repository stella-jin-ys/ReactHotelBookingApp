// components/RoomCard.tsx
import React, { useState } from 'react';
import RoomDetailModal from './RoomDetailModal';
import BookingModal from './BookingModal';

// Define interfaces for room and props
interface Room {
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

interface RoomCardProps {
  room: Room;
  nights: number;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  nights, 
  checkInDate, 
  checkOutDate, 
  guestCount 
}) => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  
  const totalPrice = room.price * nights;
  
  const openDetailModal = (): void => setShowDetailModal(true);
  const closeDetailModal = (): void => setShowDetailModal(false);
  
  const openBookingModal = (): void => {
    setShowBookingModal(true);
    // If detail modal is open, close it
    if (showDetailModal) {
      setShowDetailModal(false);
    }
  };
  
  const closeBookingModal = (): void => setShowBookingModal(false);
  
  return (
    <>
      <div className={`border rounded-lg overflow-hidden ${!room.available ? 'opacity-60' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div 
            className="md:col-span-1 cursor-pointer"
            onClick={openDetailModal}
          >
            <img 
              src={room.thumbnail} 
              alt={room.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 md:col-span-2">
            <h3 
              className="font-semibold text-lg mb-1 hover:text-pink cursor-pointer"
              onClick={openDetailModal}
            >
              {room.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{room.description}</p>
            <div className="flex items-center text-sm mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="ml-1">Up to {room.capacity} guests</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {room.amenities.slice(0, 4).map((amenity, index) => (
                <span key={index} className="bg-red-50 text-black text-xs px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 4 && (
                <span 
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded cursor-pointer"
                  onClick={openDetailModal}
                >
                  +{room.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
          <div className="p-4 bg-gray-50 flex flex-col justify-between md:col-span-1">
            <div className="mb-4">
              <p className="text-gray-500 text-sm">Price for {nights} {nights === 1 ? 'night' : 'nights'}</p>
              <p className="text-2xl font-bold">{totalPrice} {room.currency}</p>
              <p className="text-xs text-gray-500">Includes taxes and fees</p>
            </div>
            <button 
              className={`w-full py-2 px-4 rounded font-medium ${
                room.available 
                  ? 'bg-pink text-white hover:bg-red-300' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!room.available}
              onClick={room.available ? openBookingModal : undefined}
            >
              {room.available ? 'Reserve' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Room Detail Modal */}
      <RoomDetailModal 
        room={room}
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        onBookNow={openBookingModal}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestCount={guestCount}
      />
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={closeBookingModal}
        room={room}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestCount={guestCount}
      />
    </>
  );
};

export default RoomCard;