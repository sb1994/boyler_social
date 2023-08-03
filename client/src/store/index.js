import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authUserReducer from "./reducers/authUserReducer";
// import socketReducer from "./socketReducer";
// import userPostReducer from './userPostReducer'
// import errorReducer from "./errorReducer";

const reducer = combineReducers({
  auth: authUserReducer,
  // errors: errorReducer,
});

// import { persistStore, persistReducer } from "redux-persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistConfig = {
//   key: "root"
// };
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunkMiddleware))
// );
export default store;
