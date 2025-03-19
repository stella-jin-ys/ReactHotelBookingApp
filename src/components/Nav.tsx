import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignupClick = () => {
    navigate("/signUp");
  };

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
        {location.pathname !== "/login" && (
          <button
            onClick={handleLoginClick}
            className="border border-pink px-10 rounded-lg text-pink py-3"
          >
            Log in
          </button>
        )}
        {location.pathname !== "/login" && (
          <button
            className="bg-pink px-10 rounded-lg text-white py-3"
            onClick={handleSignupClick}
          >
            Sign up
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
