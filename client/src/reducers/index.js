import { combineReducers } from "redux";
import articles from "./articleReducer";
import authUser from "./authReducer";
import alert from "./alertReducer";

export default combineReducers({
  articles,
  authUser,
  alert
});
