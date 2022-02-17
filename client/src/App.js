
import './App.css';
import { useEffect,useState } from "react";
import axios from 'axios'

import setUserToken from './utils/setUserToken'
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const working = true
  useEffect(() => {

    // set the user token
    const token = localStorage.getItem("token");

    if (token) {
      setUserToken(token);
    }else{
      console.log('user not logged in');
    }
    // axios
    // .get(`/api/users/sean94`)
    // .then((result) => {
    //   setCurrentUser(false)
    //   console.log(result.data);
    // })
    // .catch((err) => {
    //   console.log("need to be logged in");
    // });
  }, [true])
  
  
  return (
    <div className="App">
      <h2>Hello</h2>
    </div>
  );
}

export default App;
