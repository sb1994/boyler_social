import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import GuestWelcome from "../../auth/GuestWelcome";
import ProfilePage from "../ProfilePage";
import setUserToken from "../../../utils/setUserToken";
import HomePage from "../HomePage";
import SearchPage from "../SearchPage";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
const MainContent = ({ socket }) => {
  // const location = useLocation();
  const navigate = useNavigate();

  // const [socket, setSocket] = useState({});

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  W;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="layout__main">
      <Routes>
        <Route path="/" element={<GuestWelcome />} />
        <Route path="/home" element={<HomePage socket={socket} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};
export default MainContent;
