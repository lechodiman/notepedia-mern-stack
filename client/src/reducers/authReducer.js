import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  ADD_BOOKMARK,
  DELETE_BOOKMARK
} from "../actions/types";

const initialState = {
  // The jwt token is store in the localStorage
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  // loading will change if we get data back
  loading: true,
  // the current user
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // For both REGISTER_SUCCESS and LOGIN_SUCCESS we want to do the following:

      // Save token to local storage
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        user: { ...state.user, bookmarks: [payload, ...state.user.bookmarks] }
      };
    case DELETE_BOOKMARK:
      return {
        ...state,
        user: {
          ...state.user,
          bookmarks: state.user.bookmarks.filter(
            bookmark => bookmark._id !== payload
          )
        }
      };
    default:
      return state;
  }
}
