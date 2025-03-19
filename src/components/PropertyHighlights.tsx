// components/PropertyHighlights.tsx
import React from 'react';

// Define type for amenity items
type Amenity = {
  icon: string;
  text: string;
}

const PropertyHighlights: React.FC = () => {
  // Sample amenities
  const amenities: Amenity[] = [
    { icon: "breakfast", text: "Good breakfast" },
    { icon: "fitness", text: "Fitness centre" },
    { icon: "family", text: "Family rooms" },
    { icon: "non-smoking", text: "Non-smoking rooms" },
    { icon: "room-service", text: "Room service" }
  ];

  // Generic icon renderer 
  const renderIcon = (): React.ReactElement => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="pink">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div id="facilities" className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {amenities.map((amenity, index) => (
          <li key={index} className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center text-blue-500">
              {renderIcon()}
            </div>
            <span className="ml-2 text-sm">{amenity.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyHighlights;