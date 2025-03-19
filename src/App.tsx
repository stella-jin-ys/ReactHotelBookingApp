import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelPage from "./pages/HotelDetails";
import Nav from "./components/Nav";
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
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:hotelId" element={<HotelPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmation />}
        />
      </Routes>
    </Router>
  );
}

export default App;
