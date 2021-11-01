import React from "react";
import { Switch, Route } from "react-router-dom";
import AddProfile from "../components/Profile/AddProfile";
import Login from "../components/Login/Login.js";
import Profile from "../components/Profile/Profile";
import Dashboard from "../components/Dasboard";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/addprofile" component={AddProfile} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}
