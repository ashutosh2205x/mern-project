import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { Router, Link } from "@reach/router";

import NavBar from "./components/navbar";
import Home from "./components/home";
import Profile from "./components/profile";
import SignIn from "./components/signin";
import Signup from "./components/signup";
import NotFound from "./components/notfound";
import CreateCard from "./components/createpost";
import { UserContext } from "./context/userContext";

const AllRoutes = () => {};
function App() {
  const [USER_STATE, SET_USER_STATE] = useState({});
  const value = { USER_STATE, SET_USER_STATE };
  let user = JSON.parse(localStorage.getItem("user_data"));
  let initalState = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    _id: 4981294612941,
  };
  useEffect(() => {
    if (user) {
      SET_USER_STATE(user);
    } else SET_USER_STATE(initalState);
  }, []);

  return (
    (
      <div className="App">
        <UserContext.Provider value={USER_STATE}>
          <Router>
            <Home path="/" />
            <NavBar path="/" />
            <Profile path="profile" />
            <SignIn path="signin" />
            <Signup path="signup" />
            <CreateCard path="create" />
            <NotFound default />
          </Router>
        </UserContext.Provider>
      </div>
    )
  );
}

export default App;
