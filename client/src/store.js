import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers/index";

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk // for dispatching history actions
        // ... other middlewares ...
      )
    )
  );

  return store;
}