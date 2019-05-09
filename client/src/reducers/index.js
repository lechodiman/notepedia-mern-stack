import { combineReducers } from "redux";
import articles from "./articleReducer";
import auth from "./authReducer";
import alert from "./alertReducer";

export default combineReducers({
  articles,
  auth,
  alert
});
