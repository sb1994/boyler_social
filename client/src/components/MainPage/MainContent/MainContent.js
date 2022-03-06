import React, { useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import GuestWelcome from "../../auth/GuestWelcome";
import ProfilePage from "../ProfilePage";
import setUserToken from "../../../utils/setUserToken";
import HomePage from "../HomePage";
import SearchPage from "../SearchPage";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import { useSelector, useDispatch } from "react-redux";
const MainContent = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated");
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="layout__main">
      <Routes>
        <Route path="/" element={<GuestWelcome />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};
export default MainContent;
