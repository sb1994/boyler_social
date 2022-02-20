import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GuestWelcome from "../../auth/GuestWelcome";
import ProfilePage from '../ProfilePage'
import SearchPage from '../SearchPage'
import Login from '../../auth/Login'
import Register from '../../auth/Register'
const MainContent = ({currentUser,setCurrentUser}) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    // con;
    // return () => {
    //   second;
    // };
  }, [location]);
  return (
    <div className="layout__main">
      <Routes>
        <Route exact path="/guest" element={<GuestWelcome />} />
        <Route exact path="/profile/:username" element={<ProfilePage/>} />
        <Route exact path="/search" element={<SearchPage/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
};
export default MainContent;
