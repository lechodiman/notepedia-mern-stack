// Define types of the actions we dispatch, so if we change the name of the action we only change it here.

// Alert types
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

// Auth types
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const LOGOUT = "LOGOUT";

// Note types
export const LOAD_NOTES = "LOAD_NOTES";
export const GET_NOTE = "GET_NOTE";
export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const NOTE_ERROR = "NOTE_ERROR";

export const ACCOUNT_DELETED = "ACCOUNT_DELETED";

// Profile
export const GET_PROFILE = "GET_PROFILE";
export const PROFILE_ERROR = "PROFILE_ERROR";

// Notebook types
export const LOAD_NOTEBOOKS = "LOAD_NOTEBOOKS";
export const NOTEBOOK_ERROR = "NOTEBOOK_ERROR";
