import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type SearchProps = {
  searchParams: {
    city: string;
    checkInDate: string;
    checkOutDate: string;
    guest: number;
  };
};

function SearchBar({ searchParams }: SearchProps) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [city, setCity] = useState(searchParams?.city || "");
  const [checkInDate, setCheckInDate] = useState(
    searchParams?.checkInDate || ""
  );
  const [checkOutDate, setCheckOutDate] = useState(
    searchParams?.checkOutDate || ""
  );
  const [guest, setGuest] = useState(searchParams?.guest || 1);

  useEffect(() => {
    if (searchParams) {
      setCity(searchParams.city);
      setCheckInDate(searchParams.checkInDate);
      setCheckOutDate(searchParams.checkOutDate);
      setGuest(searchParams.guest);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (!checkOutDate || checkOutDate <= checkInDate) {
      alert("Check-out date must be later than check-in date.");
      return;
    }
    navigate(
      `/Hotels?city=${encodeURIComponent(
        city
      )}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guest=${guest}`
    );
  };

  return (
    <div className="bg-white w-3/4 rounded-lg">
      <div className="flex flex-wrap justify-between items-end p-5 gap-2 w-full">
        <div className="flex flex-col gap-2 flex-1 min-w-[150px] ">
          <h2>Location</h2>
          <input
            type="text"
            value={city}
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="Where do you want to go?"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
          <h2>Check-in Date</h2>
          <input
            type="date"
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="Add a date"
            value={checkInDate}
            min={today}
            onChange={(e) => {
              setCheckInDate(e.target.value);
              if (checkOutDate && e.target.value >= checkOutDate) {
                setCheckOutDate("");
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
          <h2>Check-out Date</h2>
          <input
            type="date"
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="Add a date"
            value={checkOutDate}
            min={
              checkInDate
                ? new Date(new Date(checkInDate).getTime() + +86400000)
                    .toISOString()
                    .split("T")[0]
                : today
            }
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-[150px]">
          <h2>Guests</h2>
          <input
            type="number"
            min="1"
            value={guest}
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="1 guest, 1 room"
            onChange={(e) => setGuest(Number(e.target.value))}
          />
        </div>
        <div className="flex pt-4 flex-1 min-w-[150px]">
          <button
            className="rounded-lg bg-pink py-3 px-5 text-white w-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
