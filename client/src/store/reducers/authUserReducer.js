import {
  SET_LOGGED_USER,
  SET_SEARCHED_USER,
  GET_USERS,
  SUCCESS_FOLLOW,
  SUCCESS_FOLLOW_REMOVE,
  SET_CONNECTED_USERS,
  SET_SOCKET,
  UNSET_SOCKET,
} from "../actions/action_types";
import isEmpty from "../validation/isEmpty";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  user: {},
  searchedUser: {},
  users: [],
  connectedUsers: [],
  socket: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTED_USERS:
      return {
        ...state,
        connectedUsers: action.payload,
      };
    case SET_LOGGED_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_SEARCHED_USER:
      return {
        ...state,
        searchedUser: action.payload,
      };
    case SUCCESS_FOLLOW:
      return {
        ...state,
        searchedUser: action.payload,
      };
    case SUCCESS_FOLLOW_REMOVE:
      return {
        ...state,
        searchedUser: action.payload,
      };
    case SET_SOCKET:
      // console.log(action.payload);
      return {
        ...state,
        socket: action.payload,
      };
    case UNSET_SOCKET:
      return {
        ...state,
        socket: null,
      };
    default:
      return state;
  }
};

export default auth;
