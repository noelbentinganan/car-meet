import "./App.css";
import "./Mobile.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
// Pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Trade from "./pages/Trade";
import Sale from "./pages/Sale";
import Rent from "./pages/Rent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/user-profile" element={<PrivateRoute />}>
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
          <Route path="/category/trade" element={<Trade />} />
          <Route path="/category/sale" element={<Sale />} />
          <Route path="/category/rent" element={<Rent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
