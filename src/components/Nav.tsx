import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex flex-wrap justify-between py-5 px-10 w-full">
      <Link to="/">
        <div className="flex gap-1 items-center">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            alt="logo"
            className="w-14 h-14 object-cover"
          />
          <h1 className="font-semibold text-pink">Hotel Booking Site</h1>
        </div>
      </Link>

      <div className="flex flex-wrap gap-5">
        <button className="border border-pink px-10 rounded-lg text-pink py-3">
          Log in
        </button>
        <button className="bg-pink px-10 rounded-lg text-white py-3">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Nav;
