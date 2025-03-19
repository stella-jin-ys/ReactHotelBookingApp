// components/RoomDetailModal.tsx
import React, { useState, useEffect } from 'react';

// Define types
type Room = {
  id: number;
  name: string;
  roomNumber: string | number;
  description: string;
  price: number;
  currency: string;
  capacity: number;
  amenities: string[];
  available: boolean;
  roomType: string;
}

type RoomDetailModalProps = {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
}

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ 
  room, 
  isOpen, 
  onClose, 
  onBookNow,
  checkInDate,
  checkOutDate,
  guestCount
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  // Mock room images - replace with actual image URLs from API when available
  const [roomImages, setRoomImages] = useState<string[]>([]);
  
  useEffect(() => {
    // Generate sample images based on room type - in a real app, fetch these from API
    if (room) {
      const baseImageUrl = getBaseImageUrl(room.name);
      setRoomImages([
        baseImageUrl,
        "https://images.unsplash.com/photo-1505693794498-15c6c3f9dc2a?q=80&w=2070",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070"
      ]);
    }
  }, [room]);
  
  const getBaseImageUrl = (roomType: string): string => {
    if (!roomType) return "https://images.unsplash.com/photo-1505693794498-15c6c3f9dc2a?q=80&w=2070";
    
    const type = roomType.toLowerCase();
    if (type.includes('deluxe')) {
      return "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070";
    } else if (type.includes('suite')) {
      return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070";
    } else if (type.includes('standard')) {
      return "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932";
    } else {
      return "https://images.unsplash.com/photo-1505693794498-15c6c3f9dc2a?q=80&w=2070";
    }
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, roomImages.length, onClose]);
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Calculate nights between check-in and check-out
  const calculateNights = (): number => {
    return Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  if (!isOpen || !room) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">
            {room.name} - Room {room.roomNumber}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-grow overflow-auto">
          {/* Image gallery */}
          <div className="relative h-96">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
              style={{ 
                backgroundImage: `url(${roomImages[activeImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            {/* Navigation arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
              onClick={() => setActiveImageIndex((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 focus:outline-none"
              onClick={() => setActiveImageIndex((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1))}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {roomImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                  onClick={() => setActiveImageIndex(index)}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Thumbnail strip */}
          <div className="flex overflow-x-auto p-2 space-x-2 bg-gray-100">
            {roomImages.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex-shrink-0 cursor-pointer ${
                  index === activeImageIndex ? 'ring-2 ring-pink' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`Room view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Room details */}
          <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="md:w-2/3 mb-4 md:mb-0">
                <h4 className="font-medium mb-1">Description</h4>
                <p className="text-gray-600">{room.description}</p>
              </div>
              <div className="md:w-1/3 md:pl-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Booking Summary</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span>Check-in:</span>
                  <span className="font-medium">{formatDate(checkInDate)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Check-out:</span>
                  <span className="font-medium">{formatDate(checkOutDate)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Guests:</span>
                  <span className="font-medium">{guestCount}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nights:</span>
                  <span className="font-medium">{calculateNights()}</span>
                </div>
                <div className="border-t mt-2 pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total Price:</span>
                    <span className="text-lg">{room.price * calculateNights()} {room.currency}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t p-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Up to {room.capacity} guests</span>
          </div>
          <button 
            className={`py-2 px-6 rounded font-medium ${
              room.available
                ? 'bg-pink text-white hover:bg-red-300'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!room.available}
            onClick={room.available ? onBookNow : undefined}
          >
            {room.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModal;