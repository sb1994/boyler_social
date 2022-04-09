//auth action types
export const START_AUTH = "START_AUTH";
export const SUCCESS_AUTH = "SUCCESS";
export const SUCCESS_UPLOAD = "SUCCESS_UPLOAD";
export const FAIL_AUTH = "FAIL_AUTH";
export const LOGOUT_AUTH = "LOGOUT_AUTH";
export const SET_LOGGED_USER = "SET_LOGGED_USER";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const UPDATE_CURRENT_USER_SUCCESS = "UPDATE_CURRENT_USER_SUCCESS";
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND";
export const CLEAR_CURRENT_PROFILE = "CLEAR_CURRENT_PROFILE";
export const GET_PROFILES = "GET_PROFILES";

export const SET_CONNECTED_USERS = "SET_CONNECTED_USERS";
// Follow actions
export const ADD_FOLLOW = "ADD_FRIEND";
export const ADDING_FOLLOW = "ADDING_FOLLOW";
export const SUCCESS_FOLLOW = "SUCCESS_FOLLOW";
export const SUCCESS_FOLLOW_REMOVE = "SUCCESS_FOLLOW_REMOVE";
export const FAIL_FOLLOW = "FAIL_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";

//post action types
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const DELETE_POSTS = "DELETE_POSTS";
export const CLEAR_INPUT_ERRORS = "CLEAR_INPUT_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_ERRORS = "GET_ERRORS";
export const POST_LOADING = "POST_LOADING";

//comment acction types
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENT = "GET_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//Search action Types
export const GET_USERS = "GET_USERS";
export const FAIL_GET_USERS = "FAIL_GET_USERS";
export const GET_SEARCHED_USER = "GET_SEARCHED_USER";
export const SET_SEARCHED_USER = "SET_SEARCHED_USER";
export const FILTER_USERS = "FILTER_USERS";
export const LOADING_USERS = "LOADING_USERS";

export const GET_CHAT_POSTS = "GET_CHAT_POSTS";
export const GET_CHAT_POST = "GET_CHAT_POST";
export const JOIN_PRIVATE_CHAT = "JOIN_PRIVATE_CHAT";
