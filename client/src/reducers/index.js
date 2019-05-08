import { combineReducers } from "redux";
import articles from "./articleReducer";
import authUser from "./authReducer";

export default combineReducers({
  articles,
  authUser,
  common
});
