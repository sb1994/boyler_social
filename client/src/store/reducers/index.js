import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
// import userPostReducer from './userPostReducer'
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authUserReducer,
  errors: errorReducer,
});
