import React, { useState } from 'react';

export default function Room() {
  // Room images
  const roomImages = [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Room types
  const roomTypes = [
    { id: "deluxe", name: "Deluxe Suite", price: 299 },
    { id: "executive", name: "Executive Suite", price: 399 },
    { id: "presidential", name: "Presidential Suite", price: 699 },
  ];

  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [showAmenities, setShowAmenities] = useState(false);

  // Amenities data
  const amenities = [
    "King-size bed with premium linens",
    "55-inch smart TV with streaming",
    "High-speed WiFi",
    "Mini bar with premium selection",
    "In-room safe",
    "Coffee machine",
    "Air conditioning",
    "Room service",
    "Rainfall shower"
  ];

  return (
    <div 
      className="bg-lightGray w-full h-screen flex flex-col"
      style={{ 
        backgroundImage: `url(${roomImages[selectedImage]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4 py-8 flex flex-col h-full">
        {/* Header with room selection */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-pureWhite drop-shadow-lg">Rooms</h1>
          
          <div className="bg-offWhite bg-opacity-80 rounded-lg p-2 flex items-center space-x-2">
            <label htmlFor="roomType" className="text-sm font-medium">Room Type:</label>
            <select 
              id="roomType" 
              className="p-1 border rounded" 
              value={selectedRoom.id}
              onChange={(e) => {
                const found = roomTypes.find(r => r.id === e.target.value);
                if (found) setSelectedRoom(found);
              }}
            >
              {roomTypes.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col flex-grow">
          
          {/* Content layout with description on left, gallery on right */}
          <div className="flex flex-col md:flex-row h-full w-full justify-between">
            {/* Description section - left side */}
            <div className="mb-8 md:mb-0 w-full md:w-1/2 md:mr-4">
              {selectedImage <= 2 ? (
                <div className="bg-offWhite bg-opacity-80 p-6 rounded-lg shadow-lg">
                  {selectedImage === 0 && (
                    <>
                      <h2 className="text-xl font-semibold mb-3">{selectedRoom.name} Overview</h2>
                      <p className="text-slate mb-4">
                        Experience unparalleled luxury in our signature {selectedRoom.name}. This spacious accommodation 
                        features a king-size bed with premium linens, a separate sitting area with designer 
                        furnishings, and floor-to-ceiling windows offering panoramic views.
                      </p>

                      {/* Amenities toggle */}
                      <button 
                        className="bg-lightGray text-slate py-2 px-4 rounded hover:bg-gray-300"
                        onClick={() => setShowAmenities(!showAmenities)}
                      >
                        {showAmenities ? "Hide Amenities" : "View Amenities"}
                      </button>
                      
                      {/* Amenities accordion */}
                      {showAmenities && (
                        <div className="mt-4 p-3 bg-pureWhite rounded border">
                          <h3 className="font-medium mb-2">Room Amenities</h3>
                          <ul className="grid grid-cols-2 gap-2">
                            {amenities.map((amenity, index) => (
                              <li key={index} className="flex items-center">
                                <span className="mr-2">•</span> {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                  
                  {selectedImage === 1 && (
                    <>
                      <h2 className="text-xl font-semibold mb-3">Bedroom Details</h2>
                      <p className="text-slate">
                        Our bedroom area features a luxurious king-size bed with handcrafted headboard and 
                        premium Egyptian cotton sheets. The space includes custom lighting fixtures, blackout curtains,
                        and a state-of-the-art climate control system for your perfect comfort.
                      </p>
                    </>
                  )}
                  
                  {selectedImage === 2 && (
                    <>
                      <h2 className="text-xl font-semibold mb-3">Bathroom Amenities</h2>
                      <p className="text-slate">
                        The en-suite marble bathroom features dual vanities with illuminated mirrors, a deep soaking 
                        tub, and a separate rainfall shower. Enjoy plush towels, bathrobes, and slippers along with 
                        our signature collection of organic toiletries.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-32"></div>
              )}
            </div>
            
            {/* Gallery section - right aligned */}
            <div className="mt-auto md:mt-0 w-full md:w-10/12 bg-offWhite bg-opacity-80 p-4 rounded-lg shadow-lg self-end">
              <h3 className="text-lg font-medium mb-2">Room Gallery</h3>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {roomImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border-2 transition-all ${selectedImage === index ? 'border-teal scale-105' : 'border-lightGray hover:border-slate'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Room view ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Booking button - aligned to the right within the gallery container */}
              <div className="flex justify-end">
                <button 
                  className="bg-pink text-pureWhite py-3 px-6 rounded font-medium hover:bg-teal"
                  onClick={() => window.location.href = '/booking'}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}