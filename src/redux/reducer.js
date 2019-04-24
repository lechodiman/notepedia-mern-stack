import { combineReducers } from "redux";
import articles from "./reducers/articles";
import authUser from "./reducers/authUser";
import common from "./reducers/common";
import { connectRouter } from "connected-react-router";

export default history => {
  return combineReducers({
    router: connectRouter(history),
    articles,
    authUser,
    common
  });
};

// export default combineReducers({
//   articles,
//   authUser,
//   common,
//   router: routerReducer
// });
