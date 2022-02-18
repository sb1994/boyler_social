import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import GuestWelcome from "../../auth/GuestWelcome";

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
      </Routes>
    </div>
  );
};
export default MainContent;
