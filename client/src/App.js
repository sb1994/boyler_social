import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import setUserToken from "./utils/setUserToken";
import MainContent from "./components/MainPage/MainContent/MainContent";
import Loading from "./components/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, loginAuth } from "./store/actions/userAuthActions";
import HomePage from "./components/MainPage/HomePage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  let token;
  useEffect(() => {
    // set the user token
    token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      dispatch(getCurrentUser());
      // navigate("/login");

      setIsLoading(false);
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
        <MainContent />
      </div>
    </Router>
  );
};

export default App;
