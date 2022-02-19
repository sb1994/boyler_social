import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GuestWelcome from "../../auth/GuestWelcome";
import ProfilePage from '../ProfilePage'
import SearchPage from '../SearchPage'
const MainContent = () => {
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
      </Routes>
    </div>
  );
};
export default MainContent;
