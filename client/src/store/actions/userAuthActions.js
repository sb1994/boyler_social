import axios from "axios";
import setUserToken from "../../utils/setUserToken";
import jwt_decode from "jwt-decode";

import * as types from "./action_types";

// Register User
export const registerUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => console.log("hello"))

    .catch((err) =>
      dispatch({
        type: types.FAIL_AUTH,
        payload: err.response.data,
      })
    );
};
export const getUsers = () => (dispatch) => {
  axios
    .get("/api/users/all")
    .then((res) =>
      dispatch({
        type: types.GET_USERS,
        payload: res.data,
      })
    )

    .catch((err) =>
      dispatch({
        type: types.FAIL_GET_USERS,
        payload: err.response.data,
      })
    );
};

export const addFollow = (user_id) => (dispatch) => {
  axios
    .post(`/api/users/follow/${user_id}/add`, user_id)
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: types.SUCCESS_FOLLOW,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch({
        type: types.FAIL_FOLLOW,
        payload: err.response.data,
      })
    );
  // dispatch({
  //   type: types.SUCCESS_FOLLOW,
  // })
};
export const removeFollow = (user_id) => (dispatch) => {
  console.log(user_id);

  axios
    .post(`/api/users/follow/${user_id}/remove`)
    .then((res) => {
      dispatch({
        type: types.SUCCESS_FOLLOW_REMOVE,
        payload: res.data,
      });
    })

    .catch((err) =>
      dispatch({
        type: types.FAIL_FOLLOW,
        payload: err.response.data,
      })
    );
  // dispatch({
  //   type: types.SUCCESS_FOLLOW,
  // })
};
export const startAuth = () => {
  return {
    type: types.START_AUTH,
  };
};
export const successAuth = (token) => {
  return {
    type: types.SUCCESS_AUTH,
    token: token,
  };
};
export const successUpload = (token) => {
  return {
    type: types.SUCCESS_UPLOAD,
    // token: token
  };
};
export const failAuth = (error) => {
  return {
    type: types.FAIL_AUTH,
    error: error,
  };
};
// Set logged in user
export const setLoggedUser = (decoded) => {
  return {
    type: types.SET_LOGGED_USER,
    payload: decoded,
  };
};

export const getCurrentUser = () => async (dispatch) => {
  const { data } = await axios.get("/api/users/current");

  dispatch(setLoggedUser(data));
};
export const getSearchedUser = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/users/${id}`)
      // .get(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((result) => {
        dispatch(setSearchedUser(result.data));
        // console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const setConnectedUsers = (connectedUsers) => {
  console.log(connectedUsers);
  return {
    type: types.SET_CONNECTED_USERS,
    payload: connectedUsers,
  };
};

export const setSearchedUser = (user) => {
  return {
    type: types.SET_SEARCHED_USER,
    payload: user,
  };
};

export const loginAuth = (email, password) => (dispatch) => {
  dispatch(startAuth());

  console.log(email, password);
  axios
    .post("/api/users/login", {
      email,
      password,
    })
    .then((result) => {
      const token = result.data.token;
      //sets the expirey date
      // const expire = new Date(new Date().getTime() + 10000 * 1000)
      //stores the the token and the expireation date in the browser
      //as a cookie
      localStorage.setItem("token", token);
      setUserToken(token);
      dispatch(setLoggedUser(result.data.user));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const registerAuth = ({ password, name, email }) => {
  //alert that the register has started
  return (dispatch) => {
    dispatch(startAuth());

    axios
      .post("api/users/register", {
        password,
        name,
        email,
      })
      .then((result) => {
        console.log(result);

        // let { token } = result.data
        // //stores the the token and the expireation date in the browser
        // //as a cookie
        // if (token !== '') {
        //   localStorage.setItem('token', token)
        //   setUserToken(token)
        //   const decoded = jwt_decode(token)
        //   dispatch(setLoggedUser(decoded))
        // } else {
        //   console.log(result.data.email)
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const updateUser = (updatedUser) => (dispatch) => {
  console.log(updatedUser);
  dispatch(startAuth());

  let { bio, website, location, status, githubusername, profile_pic } =
    updatedUser;

  axios
    .post("/api/users/update", {
      // hello: 'this is my code'
      bio,
      website,
      location,
      status,
      githubusername,
      profile_pic,
    })
    .then((result) => {
      dispatch(setLoggedUser(result.data.user));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("token");
  // Remove auth header for future requests
  setUserToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setLoggedUser({}));
  dispatch(setSearchedUser({}));
};
