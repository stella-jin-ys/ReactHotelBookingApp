import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../apiServices.tsx/SignupService";
import Nav from "../components/Nav";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await Signup(formData);
      if (response) {
        setSuccess("Account created successfully!");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    } catch (err) {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <div
      className="h-screen overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <div className=" flex items-center justify-center mt-32 w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 bg-opacity-80 py-10 px-24 rounded-lg flex flex-col gap-5 "
        >
          <Link to="/">
            <img
              className="mx-auto h-16 w-auto"
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt="Hotel Booking Site Logo"
            />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 ">
              Create an account
            </h1>
            <p className="text-gray-700">
              Already have an account? Go to
              <Link
                to="/login"
                className="border-b border-pink p-1 text-pink font-extrabold"
              >
                Log in
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-5 text-xl ">
            <div className="flex flex-col gap-2">
              <p>First name</p>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-3 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Last name</p>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 rounded-lg"
                required
              />
              <div className="flex flex-col gap-2">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-3 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="bg-pink text-white py-5 rounded-lg">
            Submit
          </button>
          {success && (
            <p className="text-green-600 text-xl text-center font-semibold">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-xl text-center font-semibold">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
