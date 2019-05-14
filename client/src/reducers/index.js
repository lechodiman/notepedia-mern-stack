import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import notes from "./noteReducer";
import profile from "./profileReducer";

export default combineReducers({
  auth,
  alert,
  notes,
  profile
});
