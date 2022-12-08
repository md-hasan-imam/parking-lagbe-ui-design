
import { Routes, Route, Link } from "react-router-dom";
import Register from "../src/components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import ForgetPassword from "./components/Auth/ForgotPassword/ForgotPassword"
import ChangePassword from "./components/Auth/ChangePassword/ChangePassword"
import Navbar from "./components/Shared/Navbar/Navbar"
import HomePage from "./components/Home/HomePage/HomePage";
import List from "./components/ParkingBooking/SearchList/List"
import SingleSearchItem from "./components/ParkingBooking/SingleSearchItem/SingleSearchItem";
import StripePayment from "./components/ParkingBooking/Pay/StripePayment";



function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Parking" element={<List />} />
        <Route path="/Parking/:id" element={<SingleSearchItem />} />
        <Route path="/pay" element={<StripePayment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/user/reset/:id/:token" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
