import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { io } from "socket.io-client";
import setUserToken from "./utils/setUserToken";
import IndexPage from "./components/IndexPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  loginAuth,
  setConnectedUsers,
} from "./store/actions/userAuthActions";
import HomePage from "./components/MainPage/HomePage";
import { useHistory } from "react-router-dom";
import SearchPage from "./components/MainPage/SearchPage";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setupSocket] = useState(null);
  const dispatch = useDispatch();
  let history = useHistory();

  let token;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // const socket = useRef(null);
  useEffect(() => {
    // set the user token
    let token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      dispatch(getCurrentUser());
      // navigate("/login");
      // socket.on("connect", () => console.log("heoo"));

      setIsLoading(false);
    } else {
      // dispatch(loginAuth("sean94@gmail.com", "Seancal123"));
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // set the user token
    // console.log(token);
    // console.log("hello");
    let token = localStorage.getItem("token");
    if (token) {
      const newSocket = io("http://localhost:5000", {
        query: { token },
      });
      console.log(newSocket);
      setupSocket(newSocket);
    }
  }, [token]);
  useEffect(() => {
    // set the user token
    // console.log(token);
    // console.log("hello");
    if (user && socket) {
      console.log("I can get the cactive users");
      socket.on("connected", (data) => {
        console.log(data);
        dispatch(setConnectedUsers(data));
      });
      socket.on("disconnected", (data) => {
        dispatch(setConnectedUsers(data));
      });
    }
  }, [socket]);

  if (isLoading && !socket) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route
            path="/login"
            render={() => <Login setupSocket={setupSocket} socket={socket} />}
            exact
          />
          <Route path="/register" component={Register} exact />
          <Route
            path="/home"
            render={() => <HomePage socket={socket} />}
            exact
          />
          <Route
            path="/search"
            render={() => <SearchPage socket={socket} />}
            exact
          />
          {/*<Route
            path="/chatroom/:id"
            render={() => <ChatroomPage socket={socket} />}
            exact
          />  */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
