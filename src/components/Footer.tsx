import React from "react";

function Footer() {
  return (
    <div className="flex flex-col gap-20 font-funnel w-full py-20 px-20 text-lg lg:w-4/5">
      <div className="flex flex-wrap justify-between gap-16 ">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">Explore more</h2>
          <p>Seasonal & Holiday Deals</p>
          <p>Travel for Business</p>
          <p>Book Restaurants</p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">Terms & Settings</h2>
          <p>Privacy & Cookies</p>
          <p>Terms & Conditions</p>
          <p>Human Rights Policy</p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">For Partners</h2>
          <p>Partner Help</p>
          <p>List Your Property</p>
          <p>Become a Distribution Partner</p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold">About Us</h2>
          <p>How We Work</p>
          <p>Media</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="font-bold">Copyright&copy;. All rights reserved.</div>

        <div className="flex gap-5 justify-end">
          <button>
            <img
              src={`${process.env.PUBLIC_URL}/assets/instagram.png`}
              alt="instagram"
              className="p-3 w-12 h-12 object-cover bg-slate-200  rounded-full"
            />
          </button>
          <button>
            <img
              src={`${process.env.PUBLIC_URL}/assets/twitter.png`}
              alt="twitter"
              className="p-3 w-12 h-12 object-cover bg-slate-200  rounded-full"
            />
          </button>
          <button>
            <img
              src={`${process.env.PUBLIC_URL}/assets/facebook.png`}
              alt="facebook"
              className="p-3 w-12 h-12 object-cover bg-slate-200  rounded-full"
            />
          </button>
          <button>
            <img
              src={`${process.env.PUBLIC_URL}/assets/tiktok.png`}
              alt="tiktok"
              className="p-3 w-12 h-12 object-cover bg-slate-200  rounded-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
