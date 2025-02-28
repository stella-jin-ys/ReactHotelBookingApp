import React from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";

const hotels = [
  {
    title: "Clarion Hotel Amaranten",
    address: "Kungsholmen, Stockholm",
    roomType: "Double room",
    price: 3014,
    image:
      "https://images.pexels.com/photos/591383/pexels-photo-591383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review: "Very good",
  },
  {
    title: "Castle House Inn",
    address: "Old Town, Stockholm",
    roomType: "Single room",
    price: 2261,
    image:
      "https://images.pexels.com/photos/3770883/pexels-photo-3770883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    review: "Good",
  },
];

function Hotels() {
  return (
    <div className="w-full">
      <div className="border-b">
        <Nav />
      </div>
      <div className="flex flex-col items-center -top-10">
        <SearchBar />
        <div className="w-2/3 align-self-start px-5 pb-5">
          <a href="/Home">Home</a> {" > "}
          <a href="Hotels/Sweden">Sweden</a>
          {" > "}
          <a href="Hotels/Sweden/Stockholm">Stockholm</a> {" > "}
          Search results
        </div>
        <div className="flex gap-5 justify-between w-2/3 px-5">
          <div className="flex flex-col">
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
          <div className="flex flex-col gap-5 w-4/5">
            <h1 className="font-bold text-2xl">Stockholm: 2 hotels found</h1>
            <input
              type="options"
              value="Sort by: price high to low"
              className="border rounded-xl w-1/3 px-5 py-3"
            />
            {hotels.map((hotel) => (
              <div className="flex gap-5 justify-between border p-5 rounded-lg">
                <div className="flex gap-5">
                  <img
                    src={hotel.image}
                    alt="Hotel image"
                    className="w-60 h-60 object-cover rounded-lg"
                  />

                  <div className="flex flex-col justify-self-start">
                    <h2 className="text-2xl font-bold text-pink">
                      {hotel.title}
                    </h2>
                    <p className="font-bold text-pink">{hotel.address}</p>
                    <p>{hotel.roomType}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-8 justify-center">
                  <div className="flex flex-col">
                    <p className="text-2xl font-semibold">{hotel.review}</p>
                    <p>10,203 reviews</p>
                  </div>
                  <div className="flex flex-col">
                    <p>2 nights, 2 adults</p>
                    <p className="text-2xl font-semibold">SEK {hotel.price}</p>
                    <p>Including tax and fees</p>
                  </div>
                  <button className="bg-pink px-5 py-3 rounded-lg text-white">
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
