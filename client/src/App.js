import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  BrowserRouter,
} from "react-router-dom";

import { io } from "socket.io-client";
import setUserToken from "./utils/setUserToken";
import MainContent from "./components/MainPage/MainContent/MainContent";
import Loading from "./components/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, loginAuth } from "./store/actions/userAuthActions";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  let token;

  const [socket, setSocket] = useState({});
  useEffect(() => {
    // set the user token
    token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      dispatch(getCurrentUser());
      // navigate("/login");

      const newSocket = io("ws://localhost:5000");
      // create the socket

      // console.log("User is authenticated");
      setSocket(newSocket);
      // socket.on("connect", () => console.log("heoo"));

      setIsLoading(false);
    } else {
      console.log("user not logged in");

      // dispatch(loginAuth("sean94@gmail.com", "Seancal123"));
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // set the user token

    if (token) {
      // navigate("/login");
      // create the socket
      console.log("creating a socket");
    } else {
      console.log("user not logged in");

      // dispatch(loginAuth("sean94@gmail.com", "Seancal123"));
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        <MainContent socket={socket} />
      </div>
    </Router>
  );
};

export default App;
