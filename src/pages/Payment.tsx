import React from "react";
import Nav from "../components/Nav";

function Payment() {
  return (
    <div className="w-full">
      <div className="border-b">
        <Nav />
      </div>
      <div className="flex justify-center gap-10 pt-5 ">
        <div className="flex flex-col gap-5 ">
          <div className="border border-red-300 rounded-md">
            <div className="border-b border-red-300">
              <h2 className="p-5 bg-red-100">Your booking details</h2>
            </div>
            <div className="p-5">
              <p>Check-in:</p>
              <p>Friday, March 7, 2025 from 3:00 PM</p>
              <p>Check-out:</p>
              <p>Sunday, March 9, 2025 until 11.30 AM</p>
              <p>Total length of stay</p>
              <p>2 nights</p>
            </div>
          </div>
          <div className="border border-red-300 rounded-md">
            <div className="border-b border-red-300">
              <h2 className="p-5 bg-red-100">Price overview</h2>
            </div>

            <div className="py-3 px-5 flex justify-between">
              <p>Double room</p>
              <p>SEK 2,878</p>
            </div>
            <div className="px-5 py-3 flex justify-between text-2xl bg-red-50">
              <p>Price</p>
              <p>SEK 2,878</p>
            </div>
            <p className="py-3 px-5">Including taxes and fees</p>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-1/2">
          <div className="flex gap-5 ">
            <img
              src="https://images.pexels.com/photos/591383/pexels-photo-591383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
                    "
              alt="Hotel image"
              className="w-60 h-60 object-cover rounded-lg"
            />

            <div className="flex flex-col justify-self-start">
              <h2 className="text-2xl font-bold text-pink">
                Clarion Hotel Amaranten
              </h2>
              <p className="font-bold text-pink">Kungsholmen, Stockholm</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 border p-5">
            <div className="flex flex-col gap-3">
              <h3>Card holder's name *</h3>
              <input type="text" className="border rounded-md p-3 " />
            </div>
            <div className="flex flex-col gap-3">
              <h3>Card number *</h3>
              <input type="number" className="border rounded-md p-3 " />
            </div>
            <div className="flex gap-5 ">
              <div className="">
                <h3>Expire date *</h3>
                <input type="number" className="border rounded-md p-3 " />
              </div>
              <div>
                <h3>CVC *</h3>
                <input type="number" className="border rounded-md p-3 " />
              </div>
            </div>
          </div>
          <div className="place-self-end">
            <button className="border px-7 py-3 bg-red-100">
              Complete booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
