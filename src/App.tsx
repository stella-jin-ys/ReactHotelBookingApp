import React from "react";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelPage from './pages/hotels/HotelPage2';
import Nav from './components/Nav';
import BookingConfirmation from "./pages/BookingConfirmation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

function App() {
  return (
    
    <Elements stripe={stripePromise}>
      <Router>
      <Nav />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Hotels" element={<Hotels />} />
          <Route path="/hotels/:hotelId" element={<HotelPage />} /> {/* Add this new route */}
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
