import { connect } from "mongoose";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { io } from "socket.io-client";

const HomePage = ({ socket }) => {
  let history = useHistory();

  const { user, isAuthenticated, connectedUsers } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!isAuthenticated) {
      // window.location.reload();
      history.push("/login");
    } else {
      // console.log(socket);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // socket.current.on("connect", () => console.log("heelo"));

    if (socket) {
      //
      console.log(socket);
    }
  }, [user]);

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/search">Search</Link>
      {connectedUsers.map((user) => (
        <p key={user.socketId}>{user.socketId}</p>
      ))}
    </div>
  );
};

export default HomePage;
