import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Switch, Route } from "react-router-dom";
import "./assets/medium.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { store, history } from "./redux/store";

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
