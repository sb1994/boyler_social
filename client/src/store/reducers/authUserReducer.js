import {
  SET_LOGGED_USER,
  SET_SEARCHED_USER,
  GET_USERS,
  SUCCESS_FOLLOW,
  SUCCESS_FOLLOW_REMOVE,
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
};

const auth = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default auth;
