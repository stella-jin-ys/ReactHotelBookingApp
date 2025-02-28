import React from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  return (
    <div className="bg-white w-2/3 rounded-lg">
      <div className="flex flex-wrap w-full justify-between items-end  p-5 gap-2 lg:gap-0">
        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <h2>Location</h2>
          <input
            type="text"
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="Where do you want to go?"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <h2>Check-in and Check out Date</h2>
          <input
            type="date"
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="Add a date"
          />
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <h2>Guests</h2>
          <input
            type="number"
            value={1}
            className="px-5 py-3 bg-slate-200 rounded-lg text-black"
            placeholder="1 guest, 1 room"
          />
        </div>
        <div className="flex pt-4 w-full lg:w-auto">
          <button className="rounded-lg bg-pink py-3 px-5 text-white w-full">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
