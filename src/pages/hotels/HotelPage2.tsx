// pages/hotels/HotelPage2.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import HotelInfo from '../../components/HotelInfo';
import NavigationTabs from '../../components/NavigationTabs';
import ImageGallery from '../../components/ImageGallery';
import AvailabilityComponent from '../../components/AvailabilityComponent';
import PropertyHighlights from '../../components/PropertyHighlights';
import ReviewScores from '../../components/ReviewScores';
import ReserveCard from '../../components/ReserveCard';
import MapCard from '../../components/MapCard';
import { fetchHotel, fetchHotels } from '../../services/apiService';
import Nav from '../../components/Nav';

// Define the Hotel interface
interface Hotel {
  hotelID?: number;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  rooms?: any[];
}

const HotelPage: React.FC = () => {
  // Get hotelId from URL params and other search parameters from query string
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchParams, setSearchParams] = useState({
    city: queryParams.get('city') || '',
    checkInDate: queryParams.get('checkInDate') || '',
    checkOutDate: queryParams.get('checkOutDate') || '',
    guest: parseInt(queryParams.get('guest') || '1', 10)
  });

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(
    hotelId ? parseInt(hotelId, 10) : null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHotels = async (): Promise<void> => {
      try {
        setLoading(true);
        
        // If we have a specific hotelId, fetch just that hotel
        if (selectedHotelId) {
          try {
            const hotel = await fetchHotel(selectedHotelId);
            setHotels([hotel]);
          } catch (err) {
            // If fetching specific hotel fails, fall back to fetching all hotels
            console.error("Failed to fetch specific hotel, falling back to all hotels:", err);
            const hotelsData = await fetchHotels(
              searchParams.city,
              searchParams.checkInDate,
              searchParams.checkOutDate,
              searchParams.guest
            );
            setHotels(hotelsData);
          }
        } else {
          // If no specific hotelId, fetch all hotels with search parameters
          const hotelsData = await fetchHotels(
            searchParams.city,
            searchParams.checkInDate,
            searchParams.checkOutDate,
            searchParams.guest
          );
          setHotels(hotelsData);
          
          // Select the first hotel by default if there are any hotels
          if (hotelsData && hotelsData.length > 0) {
            setSelectedHotelId(hotelsData[0].hotelID);
          }
        }
        
        setError(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load hotels');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadHotels();
  }, [selectedHotelId, searchParams.city, searchParams.checkInDate, searchParams.checkOutDate, searchParams.guest]);

  if (loading) return <div className="container mx-auto px-4 py-8">Loading hotel information...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  if (hotels.length === 0) return <div className="container mx-auto px-4 py-8">No hotels found</div>;

  // Parse dates for the AvailabilityComponent
  const checkInDateObj = searchParams.checkInDate ? new Date(searchParams.checkInDate) : new Date();
  const checkOutDateObj = searchParams.checkOutDate ? new Date(searchParams.checkOutDate) : new Date(Date.now() + 86400000);

  return (
    <div>
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
          <NavigationTabs />
          <HotelInfo hotelId={selectedHotelId} />
          <ImageGallery />
          <PropertyHighlights />
          {/* Pass the search parameters to AvailabilityComponent */}
          <AvailabilityComponent 
            hotelId={selectedHotelId} 
            initialCheckInDate={checkInDateObj}
            initialCheckOutDate={checkOutDateObj}
            initialGuests={searchParams.guest}
          />
        </div>
        <div>
          <ReserveCard />
          <ReviewScores />
          <MapCard />
        </div>
      </div>
    </div>
    </div>
  );
};

export default HotelPage;