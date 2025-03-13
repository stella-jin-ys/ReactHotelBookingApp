import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { GetAllHotels } from "../apiServices.tsx/HotelService";
import { useLocation } from "react-router-dom";

type Hotel = {
  hotelID: number,
  name: string;
  address: string;
  city: string;
  rooms: Room[];
};
type Room = {
  roomType: string;
  pricePerNight: number;
};

const image1 =
  "https://images.pexels.com/photos/591383/pexels-photo-591383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const image2 =
  "https://images.pexels.com/photos/3770883/pexels-photo-3770883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    guest: 1,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city") || "";
    const checkInDate = params.get("checkInDate") || "";
    const checkOutDate = params.get("checkOutDate") || "";
    const guest = params.get("guest") || "1";

    setSearchParams({
      city,
      checkInDate,
      checkOutDate,
      guest: parseInt(guest, 10),
    });

    const getHotels = async () => {
      try {
        const data = await GetAllHotels(
          city,
          checkInDate,
          checkOutDate,
          parseInt(guest, 10)
        );
        setHotels(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      }
    };

    getHotels();
  }, [location.search]);

  // Function to handle navigation to hotel detail page
  const handleSeeAvailability = (hotelId: number) => {
    navigate(`/hotels/${hotelId}?city=${encodeURIComponent(searchParams.city)}&checkInDate=${searchParams.checkInDate}&checkOutDate=${searchParams.checkOutDate}&guest=${searchParams.guest}`);
  };

  return (
    <div className="w-full">
      <div className="border-b">
      </div>
      <div className="flex flex-col items-center -top-10">
        <SearchBar searchParams={searchParams} />
        <div className="w-2/3 align-self-start px-5 pb-5">
          <a href="/Home">Home</a> {" > "}
          <a href="Hotels/Sweden">Country</a>
          {" > "}
          <a href="Hotels/Sweden/Stockholm">{searchParams.city}</a> {" > "}
          Search results
        </div>
        <div className="flex gap-5 justify-between w-2/3 px-5">
          <div className="hidden lg:flex flex-col">
            <div className="w-80 h-60">
              <img
                src={`${process.env.PUBLIC_URL}/assets/map.png`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col border py-3">
              <h2 className="border-b font-bold p-3">
                Customize your search by:
              </h2>
              <div className="border-b py-3">
                <h3 className="px-3">Your budget(per night)</h3>
                <p className="px-3">SEK 400-SEK 3,000+</p>
              </div>
              <div className=" p-3">
                <h3 className="font-bold pb-3">
                  Popular filters for Stockholm
                </h3>
                <div className="flex flex-col">
                  <span>
                    <input type="checkbox" /> Stockholm city center
                  </span>
                  <span>
                    <input type="checkbox" /> Two single beds
                  </span>
                  <span>
                    <input type="checkbox" /> Spa and wellness center
                  </span>
                  <span>
                    <input type="checkbox" /> Breakfast included
                  </span>
                  <span>
                    <input type="checkbox" /> Parking
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <h1 className="font-bold text-2xl">
              {searchParams.city}: {hotels.length} hotels found
            </h1>
            <input
              type="options"
              value="Sort by: price high to low"
              className="border rounded-xl w-1/3 px-5 py-3"
            />
            {hotels.map((hotel, i) => (
              <div key={hotel.hotelID} className="flex gap-5 flex-wrap justify-end lg:justify-end border p-5 rounded-lg">
                <div className="flex justify-between gap-10">
                  <div className="w-1/2 h-60">
                    <img
                      src={image1}
                      alt="Hotel image"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-wrap justify-between items-start gap-10 w-full">
                    <div className="flex flex-col justify-self-start">
                      <h2 className="text-2xl font-bold text-pink">
                        {hotel.name}
                      </h2>
                      <p className="font-bold text-pink">
                        {hotel.address}, {hotel.city}
                      </p>
                      <p>{hotel.rooms?.[0]?.roomType ?? "N/A"} Room</p>
                    </div>
                    <div className="flex flex-col">
                      <p>2 nights, 2 adults</p>
                      <p className="text-2xl font-semibold">
                        SEK {hotel.rooms?.[0]?.pricePerNight ?? "N/A"}
                      </p>
                      <p>Including tax and fees</p>
                    </div>
                  </div>
                </div>
                <div className="flex place-self-end">
                  <button 
                    className="bg-pink px-5 py-3 rounded-lg text-white"
                    onClick={() => handleSeeAvailability(hotel.hotelID)}
                  >
                    See availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;