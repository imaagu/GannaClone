import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//import logo from "./logo.svg";
//import "./App.css";

import Home from "./components/home";
import Login from "./components/user/loginPage";
import Signup from "./components/user/signupPage";
import Logout from "./components/user/logout";
import SongDetails from "./components/songdetails";
import SongListDetails from "./components/songLIstDetails";
import Dashboard from "./components/admin/dashboard";
import AddSong from "./components/admin/addSongForm";
import auth from "./services/authServices";
import ManageUser from "./components/admin/manageUser";
import UserList from "./components/admin/userlist";
import NoAccess from "./components/admin/noaccess";
import EditSong from "./components/admin/editSong";
import ShowSongs from "./components/admin/showSongs";
import Report from "./components/admin/report";
import AddSongCSV from "./components/admin/addSongCVS";
class App extends Component {
  state = {};
  render() {
    let user = auth.getCurrentUser();
    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route
          path="/dashboard"
          component={
            user !== null && user.role === "admin" ? Dashboard : NoAccess
          }
        />
        <Route path="/playlist/:track/:name" component={SongDetails} />
        <Route path="/list/:track" component={SongListDetails} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/addsong"
          component={
            user !== null && user.role === "admin" ? AddSong : NoAccess
          }
        />
        <Route
          path="/users"
          component={
            user !== null && user.role === "admin" ? ManageUser : NoAccess
          }
        />
        <Route
          path="/userlist/:email"
          component={
            user !== null && user.role === "admin" ? UserList : NoAccess
          }
        />
        <Route
          path="/edit/:name"
          component={
            user !== null && user.role === "admin" ? EditSong : NoAccess
          }
        />
        <Route
          path="/allSongs"
          component={
            user !== null && user.role === "admin" ? ShowSongs : NoAccess
          }
        />
        <Route
          path="/report/:type"
          component={user !== null && user.role === "admin" ? Report : NoAccess}
        />
        <Route
          path="/addsongCVS"
          component={
            user !== null && user.role === "admin" ? AddSongCSV : NoAccess
          }
        />
        <Redirect to="/home" />
      </Switch>
    );
  }
}

export default App;
