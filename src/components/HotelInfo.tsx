// components/HotelInfo.tsx
import React, { useState, useEffect } from 'react';
import { GetHotelById } from '../apiServices.tsx/HotelService';

type HotelInfoProps = {
  hotelId: number | null;
}

const HotelInfo: React.FC<HotelInfoProps> = ({ hotelId }) => {
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset states when hotelId changes
    setLoading(true);
    setError(null);
    
    const getHotelData = async (): Promise<void> => {
      if (!hotelId) {
        setLoading(false);
        return;
      }
      
      try {
        const hotelData = await GetHotelById(hotelId);
        setHotel(hotelData);
        setError(null);
      } catch (err: unknown) {
        console.error('Error fetching hotel:', err);
        setError('Failed to load hotel information');
      } finally {
        setLoading(false);
      }
    };
    
    getHotelData();
  }, [hotelId]); // Re-fetch when hotelId changes
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  if (!hotel) return null;

  // Determine star rating (or use a default of 4)
  const starRating: number = 4; // Default value since it's not in your API

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(starRating)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
      <div className="flex items-center flex-wrap text-gray-600 text-sm mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>
          {[
            hotel.address,
            hotel.city,
            hotel.country
          ].filter(Boolean).join(', ')}
        </span>
        <span className="mx-2">–</span>
        <a href="#map" className="text-blue-500 hover:underline">show map</a>
      </div>
      
      {/* Contact information - Phone isn't in your model, so it's removed */}
      <div className="flex items-center flex-wrap text-gray-600 text-sm mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>Contact hotel for details</span>
      </div>
    </div>
  );
};

export default HotelInfo;