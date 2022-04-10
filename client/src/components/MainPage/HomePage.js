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
  const getDataFromSelectedUser = (socketId, userId) => {
    // let { userId } = user;
    socket.emit("userData", { socketId, userId });

    // console.log(user);
    // console.log(socketId, userId,user.user);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      // window.location.reload();
      history.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (socket) {
      //
      // console.log(socket);
      socket.on("sendHello", (data) => {
        console.log(data);
      });
    }
  }, [user]);

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/search">Search</Link>
      {connectedUsers.map((x) =>
        x.userId === user._id ? null : (
          <p
            onClick={() => getDataFromSelectedUser(x.socketId, x.userId)}
            key={x.socketId}
          >
            {x.socketId}
          </p>
        )
      )}
    </div>
  );
};

export default HomePage;
