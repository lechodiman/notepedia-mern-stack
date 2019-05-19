import React, { Fragment, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Feed from "./components/feed/Feed";
import NoteEditor from "./components/note/NoteEditor";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import Note from "./components/note/Note";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  // Set token to headers as default
  setAuthToken(localStorage.token);
}

function App() {
  // App function will run on every change of state, but we don't want this useEffect callback to run every time so we add a [] to specify that this callback only needs to be run once AND does not depend on any other variables

  // componentDidMount with React Hooks
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/notes/new" component={NoteEditor} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route path="/notes/:id" component={Note} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
