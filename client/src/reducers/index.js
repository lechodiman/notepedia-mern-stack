import { combineReducers } from "redux";
import articles from "./articleReducer";
import auth from "./authReducer";
import alert from "./alertReducer";
import notes from "./noteReducers";

export default combineReducers({
  articles,
  auth,
  alert,
  notes
});
