import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";

const SearchPage = ({ socket }) => {
  let history = useHistory();

  const { user, isAuthenticated, connectedUsers } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!isAuthenticated) {
      // window.location.reload();
      history.push("/login");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    // socket.current.on("connect", () => console.log("heelo"));

    if (socket) {
      console.log(connectedUsers);
    }
  }, [user]);
  return (
    <div>
      <h1>Search Page</h1>
      {connectedUsers.map((user) => (
        <p>{user.socketId}</p>
      ))}
      <h1>
        <Link to="/home">Home</Link>
      </h1>
    </div>
  );
};

export default SearchPage;
