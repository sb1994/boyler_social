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
  const getDataFromSelectedUser = (socketId) => {
    // console.log(connectedUsers);
    let { userId } = user;
    console.log(socketId);

    let selectedUser = connectedUsers.filter((u) => {
      return u.socketId === socketId;
    });

    console.log(selectedUser);
    // socket.emit("sayHello", { socketId, userId });
    // console.log(socket);

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
      socket.on("recieveHello", (data) => {
        console.log(data);
      });
    }
  }, [user]);

  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/search">Search</Link>
      {connectedUsers.map((x) =>
        // console.log(x)
        x.userId === user._id ? null : (
          <p
            onClick={() => getDataFromSelectedUser(x.socketId, x.userId)}
            key={x.socketId}
          >
            {x.socketId} :{x.user.firstName}
          </p>
        )
      )}
    </div>
  );
};

export default HomePage;
