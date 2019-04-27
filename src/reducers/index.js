import { combineReducers } from "redux";
import articles from "./articleReducer";
import authUser from "./authReducer";
import common from "./commonReducer";
import { connectRouter } from "connected-react-router";

export default history => {
  return combineReducers({
    router: connectRouter(history),
    articles,
    authUser,
    common
  });
};
