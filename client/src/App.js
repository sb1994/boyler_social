import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import setUserToken from "./utils/setUserToken";
import MainContent from "./components/MainPage/MainContent/MainContent";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, loginAuth } from "./store/actions/userAuthActions";
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const working = true;
  let token;
  useEffect(() => {
    // set the user token
    token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      dispatch(getCurrentUser());
      setIsLoading(false);
    } else {
      console.log("user not logged in");

      dispatch(loginAuth("sean94@gmail.com", "Seancal123"));
    }
  }, [token]);
  // useEffect(() => {
  //   // set the user token
  //   token = localStorage.getItem("token");
  //   dispatch(getCurrentUser());

  //   if (token) {
  //   }
  // }, [token]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <MainContent
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </Router>
    </div>
  );
};

export default App;
