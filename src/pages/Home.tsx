import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { GetAllHotels } from "../apiServices.tsx/HotelService";

type Hotel = {
  hotelID: number;
  name: string;
  address: string;
  city: string;
  imageUrl: string;
  rooms: Room[];
};
type Room = {
  roomType: string;
  pricePerNight: number;
};

function Home() {
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    guest: 1,
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const clickCity = (city: string) => {
    navigate(`/hotels?city=${encodeURIComponent(city)}`);
  };

  useEffect(() => {
    const param = new URLSearchParams(location.search);
    const city = param.get("city") || "";
    const getHotels = async () => {
      try {
        const data = await GetAllHotels(city);
        setHotels(data);
        console.log(hotels);
      } catch (error) {
        console.error("Failed to fetch hotels", error);
      }
    };
    getHotels();
  }, [location.search]);

  return (
    <>
      <div
        className="w-full h-screen"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <Nav />
        <div className="w-full h-full py-20">
          <div className="flex flex-col items-center gap-16 lg:gap-20">
            <div className="text-8xl text-center text-white font-bold px-10">
              <div className="flex flex-wrap gap-8 text-center justify-center pb-5">
                <p className="font-mogra">Discover the best</p>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/hotel-sign.png`}
                  alt="hotel-sign"
                  className="w-36 h-36 object-cover"
                />
              </div>
              <p className="font-mogra">for your next vacation!</p>
            </div>

            <SearchBar searchParams={searchParams} />

            <div className="flex flex-col items-center bg-white md:py-10 px-10 mx-auto gap-10 rounded-lg h-4/5 mt-10">
              <h2 className="text-center text-4xl sm:text-6xl font-funnel font-bold text-slate-700 lg:p-10">
                Explore hotels in the popular city!
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {hotels.map((item) => (
                  <div className="flex relative">
                    <img
                      src={item.imageUrl}
                      alt="image"
                      className="w-80 h-96 object-cover rounded-lg"
                    />
                    <button
                      className="absolute top-60 left-4 text-white bg-black bg-opacity-40 w-11/12 h-32 rounded-lg"
                      onClick={() => clickCity(item.city)}
                    >
                      <div className="flex justify-between items-center p-3 h-full">
                        <p className="font-bold text-xl">
                          Hotel in {item.city}
                        </p>
                        <div className="border rounded-lg">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/arrow-right.png`}
                            alt="arrow-right"
                            className="w-8 h-8 object-cover"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-4xl sm:text-6xl font-funnel font-bold text-slate-700">
                Top trending hotels worldwide!
              </h2>

              <div className="grid md:grid-flow-col lg:grid-flow-col md:grid-cols-3 xl:grid-cols-4 gap-6 p-10 lg:px-40 ">
                <div className="md:col-span-2 relative font-league">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-5 left-5 flex ">
                    <div className="flex gap-3 bg-slate-200 rounded-xl px-4 py-2 opacity-70">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/star.png`}
                        alt="rate"
                        className="w-5 h-5 object-cover"
                      />
                      <p>4.9</p>
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-12 flex flex-col items-start py-5 gap-2 bg-slate-200 opacity-80 pl-5 w-5/6 rounded-lg">
                    <h2 className="text-2xl font-semibold">Grand Hotel</h2>
                    <div className="flex text-slate-700 items-center gap-2">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/location.png`}
                        alt="location"
                        className="w-4 h-4 object-cover"
                      />
                      <p className="text-md">Stockholm, Sweden</p>
                    </div>
                    <div className="flex gap-5 items-end">
                      <p className="text-3xl font-semibold text-pink">
                        1,562 SEK
                      </p>
                      <p className="text-slate-700 line-through text-lg">
                        2,654 SEK
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 bg-slate-200 p-2 rounded-full opacity-70">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/heart.png`}
                      alt="heart"
                      className="w-5 h-5 object-cover "
                    />
                  </div>
                </div>
                <div className=" grid grid-cols-subgrid  gap-8 grid-row-3 xl:col-span-2">
                  <div className="relative ">
                    <img
                      src="https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-3/4 object-cover rounded-lg"
                    />
                    <div className="absolute top-5 left-5 flex ">
                      <div className="flex gap-3 bg-slate-200 rounded-xl px-4 py-2 opacity-70">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/star.png`}
                          alt="rate"
                          className="w-5 h-5 object-cover"
                        />
                        <p>4.8</p>
                      </div>
                    </div>
                    <div className="absolute top-5 right-5 bg-slate-200 p-2 rounded-full opacity-70">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/heart.png`}
                        alt="heart"
                        className="w-5 h-5 object-cover "
                      />
                    </div>
                    <div className="flex flex-col items-start py-2 ">
                      <h2 className="text-lg font-semibold">Clarion Hotel</h2>
                      <div className="flex text-slate-700 items-center gap-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/location.png`}
                          alt="location"
                          className="w-4 h-4 object-cover"
                        />
                        <p className="text-sm">Stockholm, Sweden</p>
                      </div>
                      <div className="flex gap-5 items-end">
                        <p className="text-xl font-semibold text-pink">
                          1,746 SEK
                        </p>
                        <p className="text-slate-700 line-through text-lg">
                          2,890 SEK
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1661962495669-d72424626bdc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-3/4 object-cover rounded-lg"
                    />
                    <div className="absolute top-5 left-5 flex ">
                      <div className="flex gap-3 bg-slate-200 rounded-xl px-4 py-2 opacity-70">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/star.png`}
                          alt="rate"
                          className="w-5 h-5 object-cover "
                        />
                        <p>4.7</p>
                      </div>
                    </div>
                    <div className="absolute top-5 right-5 bg-slate-200 p-2 rounded-full opacity-70">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/heart.png`}
                        alt="heart"
                        className="w-5 h-5 object-cover "
                      />
                    </div>
                    <div className="flex flex-col items-start py-2 ">
                      <h2 className="text-lg font-semibold">
                        Radisson Blu Royal Hotel
                      </h2>
                      <div className="flex text-slate-700 items-center gap-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/location.png`}
                          alt="location"
                          className="w-4 h-4 object-cover"
                        />
                        <p className="text-sm">New York, USA</p>
                      </div>
                      <div className="flex gap-5 items-end">
                        <p className="text-xl font-semibold text-pink">
                          2,694 SEK
                        </p>
                        <p className="text-slate-700 line-through text-lg">
                          4,037 SEK
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1661963630748-3de7ab820570?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-3/4 object-cover rounded-lg"
                    />
                    <div className="absolute top-5 left-5 flex ">
                      <div className="flex gap-3 bg-slate-200 rounded-xl px-4 py-2 opacity-70">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/star.png`}
                          alt="rate"
                          className="w-5 h-5 object-cover"
                        />
                        <p>4.8</p>
                      </div>
                    </div>
                    <div className="absolute top-5 right-5 bg-slate-200 p-2 rounded-full opacity-70">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/heart.png`}
                        alt="heart"
                        className="w-5 h-5 object-cover "
                      />
                    </div>
                    <div className="flex flex-col items-start py-2 ">
                      <h2 className="text-lg font-semibold">
                        Best Western Hotel
                      </h2>
                      <div className="flex text-slate-700 items-center gap-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/location.png`}
                          alt="location"
                          className="w-4 h-4 object-cover"
                        />
                        <p className="text-sm">Miami, USA</p>
                      </div>
                      <div className="flex gap-5 items-end">
                        <p className="text-xl font-semibold text-pink">
                          2,694 SEK
                        </p>
                        <p className="text-slate-700 line-through text-lg">
                          4,037 SEK
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      className="w-full h-3/4 object-cover rounded-lg"
                    />
                    <div className="absolute top-5 left-5 flex ">
                      <div className="flex gap-3 bg-slate-200 rounded-xl px-4 py-2 opacity-70">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/star.png`}
                          alt="rate"
                          className="w-5 h-5 object-cover"
                        />
                        <p>4.9</p>
                      </div>
                    </div>
                    <div className="absolute top-5 right-5 bg-slate-200 p-2 rounded-full opacity-70">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/heart.png`}
                        alt="heart"
                        className="w-5 h-5 object-cover "
                      />
                    </div>
                    <div className="flex flex-col items-start py-2 ">
                      <h2 className="text-lg font-semibold">Elite Hotel</h2>
                      <div className="flex text-slate-700 items-center gap-2">
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/location.png`}
                          alt="location"
                          className="w-4 h-4 object-cover"
                        />
                        <p className="text-sm">Copenhagen, Denmark</p>
                      </div>
                      <div className="flex gap-5 items-end">
                        <p className="text-xl font-semibold text-pink">
                          3,065 SEK
                        </p>
                        <p className="text-slate-700 line-through text-lg">
                          4,378 SEK
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
