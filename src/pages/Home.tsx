import React, { useState } from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const data = [
  {
    title: "Hotels in Stockholm",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
  },
  {
    title: "Hotels in Lund",
    image:
      "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Hotels in Copenhagen",
    image:
      "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Hotels in Berlin",
    image:
      "https://images.pexels.com/photos/1145257/pexels-photo-1145257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
function Home() {
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    guest: 1,
  });
  return (
    <div className="w-full h-screen relative">
      <img
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Home page"
        className="w-full h-full object-cover "
      />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="flex flex-col items-center gap-12 ">
          <div>
            <h1 className="text-6xl text-white font-bold text-center">
              Discover the best hotel for your next vacation!
            </h1>
          </div>

          <SearchBar searchParams={searchParams} />

          <div className="flex flex-col items-center bg-white py-5 px-3 w-3/4 gap-10 rounded-lg h-4/5">
            <h2 className="text-3xl">
              Explore accommodations in the popular City!
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.map((item) => (
                <div className="flex relative">
                  <img
                    src={item.image}
                    alt="image"
                    className="w-80 h-96 object-cover rounded-lg"
                  />
                  <button className="absolute top-60 left-4 text-white bg-black bg-opacity-40 w-11/12 h-32 rounded-lg">
                    <div className="flex justify-between items-center p-3 h-full">
                      <p className="font-bold text-xl">{item.title}</p>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
