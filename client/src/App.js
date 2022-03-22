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
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    // set the user token
    token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      dispatch(getCurrentUser());
      // navigate("/login");

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
      console.log(isAuthenticated);
      setIsLoading(true);
      // navigate("/login");
      // create the socket
      const newSocket = io("ws://localhost:5000");
      console.log(newSocket);
      // create the socket

      // console.log("User is authenticated");
      setSocket(newSocket);

      setIsLoading(false);
    } else {
      console.log("user not logged in");

      // dispatch(loginAuth("sean94@gmail.com", "Seancal123"));
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading && !socket) {
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
