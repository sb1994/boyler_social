import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = ({ socket }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated && socket) {
      console.log("I am connected");
      socket.on("connected", () => console.log("User hased logged in"));
      socket.on("disconnected", () => console.log("User hased logged out"));
    } else {
      console.log("no socket");
    }
    // return () => {
    //   second;
    // };
  }, [isAuthenticated]);

  return <div>HomePage</div>;
};

export default HomePage;
