import { applyMiddleware, compose, createStore } from "redux";
//import { createLogger } from 'redux-logger'
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducer";

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk // for dispatching history actions
        // ... other middlewares ...
      )
    )
  );

  return store;
}

// export const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
