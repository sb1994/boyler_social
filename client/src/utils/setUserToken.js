import axios from "axios";

const setUserToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log(axios.defaults.headers.common["Authorization"]);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setUserToken;