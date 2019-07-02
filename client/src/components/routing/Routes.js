import React from "react";
import Register from "../auth/Register";
import Login from "../auth/Login";
import NoteEditor from "../note/NoteEditor";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import Note from "../note/Note";
import Feed from "../feed/Feed";
import Information from "../information/Information";
import About from "../information/About";
import CodeOfConduct from "../information/CodeOfConduct";
import Profile from "../profile/Profile";
import Bookmarks from "../bookmarks/Bookmarks";

import { Route, Switch } from "react-router-dom";
import Search from "../search/Search";

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
        <Route path="/information" component={Information} />
        <Route path="/about" component={About} />
        <Route path="/code-of-conduct" component={CodeOfConduct} />
        <Route path="/notes/:id" component={Note} />
        <Route path="/profile/:id" component={Profile} />
        <PrivateRoute path="/bookmarks" component={Bookmarks} />
        <Route path="/search" component={Search} />
      </Switch>
    </section>
  );
};

export default Routes;
