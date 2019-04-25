import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./redux/store";
import { Switch, Route } from "react-router-dom";
import "./assets/medium.css";
import App from "./App";

import { getUser } from "./redux/actions/actions";

const store = configureStore();

// Check if user is already logged in and update state accordingly
if (localStorage.Auth) {
  store.dispatch({ type: "SET_USER", user: JSON.parse(localStorage.Auth) });
  let userId = JSON.parse(localStorage.Auth)._id;
  getUser(userId).then(res => {
    store.dispatch({ type: "SET_USER", user: res });
  });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
