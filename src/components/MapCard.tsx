// components/MapCard.tsx
import React from 'react';

const MapCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/400/320')" }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <iframe 
            title="map" 
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d18047.318276132813!2d12.986859808721603!3d55.56868239606458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHotell!5e0!3m2!1ssv!2sse!4v1740996738165!5m2!1ssv!2sse" 
            width="100%" 
            height="100%" 
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapCard;