import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Payment from "./pages/Payment";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
