import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="flex flex-col  items-center py-5">
      <div className="flex justify-between w-full border-b px-10 ">
        <Link to="/">
          <img
            className="w-14 h-14 "
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            alt="Hotel Booking Site Logo"
          />
        </Link>
        <div>
          <button>User account</button>
        </div>
      </div>
      <div className="flex shadow-lg rounded-lg w-2/3 my-20">
        <div className="w-1/4 flex flex-col items-start border-x text-lg ">
          <button className="px-10 py-6 bg-red-50 w-full text-left">
            Personal information
          </button>
          <button className="px-10 py-6 bg-white w-full text-left ">
            My bookings
          </button>
          <button className="px-10 py-6 bg-red-50 w-full text-left ">
            Payment information
          </button>
          <button className="px-10 py-6 bg-white w-full text-left ">
            Favorites
          </button>
          <button className="px-10 py-6 bg-red-50 w-full text-left ">
            My reviews
          </button>
          <button className="px-10 py-6 bg-red-white w-full text-left border-b border-red-50 ">
            Message box
          </button>
        </div>
        <div className="w-2/3 px-20 pb-20">
          <h1 className="text-2xl font-semibold">Update profile</h1>
          <div className="flex flex-col gap-5  mt-10 text-lg">
            <div className="">
              <p>First Name</p>
              <input type="text" className="bg-slate-50 p-3 w-full" />
            </div>
            <div>
              <p>Last Name</p>
              <input type="text" className="bg-slate-50 p-3 w-full" />
            </div>
            <div>
              <p>Email</p>
              <input type="email" className="bg-slate-50 p-3 w-full" />
            </div>
            <div>
              <p>Password</p>
              <input type="password" className="bg-slate-50 p-3 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
