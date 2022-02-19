import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import setUserToken from "./utils/setUserToken";
import MainContent from "./components/MainPage/MainContent/MainContent";
import Loading from "./components/Loading";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const working = true;
  useEffect(() => {
    // set the user token
    const token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
      setIsLoading(false)
    } else {
      console.log("user not logged in");
    }
  }, [true]);

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="App">
      <Router>
        <MainContent></MainContent>
      </Router>
    </div>
  );
}

export default App;
