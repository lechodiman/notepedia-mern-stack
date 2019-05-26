import React from "react";
import Register from "../auth/Register";
import Login from "../auth/Login";
import NoteEditor from "../note/NoteEditor";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import Note from "../note/Note";
import Feed from "../feed/Feed";
import { Route, Switch } from "react-router-dom";
const Routes = () => {
  return (
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
  );
};

export default Routes;
