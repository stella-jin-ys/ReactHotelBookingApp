import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelPage from './pages/HotelPage';
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
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="/hotels/:hotelId" element={<HotelPage />} />{" "}
        {/* Add this new route */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
