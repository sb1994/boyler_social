import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import setUserToken from "./utils/setUserToken";
import MainContent from "./components/MainPage/MainContent/MainContent";
import Loading from "./components/Loading";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const working = true;
  let token;
  useEffect(() => {
    // set the user token
    token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      setIsLoading(false);
    } else {
      console.log("user not logged in");
    }
  }, [token]);

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
}

export default App;
