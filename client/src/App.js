import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";

import NavBar from "./components/navbar";
import Home from "./components/home";
import Profile from "./components/profile";
import SignIn from "./components/signin";
import Signup from "./components/signup";
import NotFound from "./components/notfound";
import CreateCard from "./components/createpost";
function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <NavBar path="/" />
        <Profile path="profile" />
        <SignIn path="signin" />
        <Signup path="signup" />
        <CreateCard path="create"/>
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
