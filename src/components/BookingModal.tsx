import React, { useEffect } from 'react';
import BookingForm from './BookingForm';

interface Room {
  id: number;
  name: string;
  roomType: string;
  price: number;
  capacity: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  room,
  checkInDate,
  checkOutDate,
  guestCount
}) => {
  // Prevent scrolling when modal is open
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
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}  // Close when clicking the background
    >
      <div 
        className="max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking the modal itself
      >
        <BookingForm
          roomId={room.id}
          roomName={room.name}
          roomType={room.roomType}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          pricePerNight={room.price}
          guestCount={guestCount}
          onClose={onClose}
          onSuccess={() => {
            // Success handling - could add custom logic here
            setTimeout(onClose, 3000); // Close modal after showing success for 3 seconds
          }}
        />
      </div>
    </div>
  );
};

export default BookingModal;