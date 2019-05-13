import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import notes from "./noteReducers";

export default combineReducers({
  auth,
  alert,
  notes
});
