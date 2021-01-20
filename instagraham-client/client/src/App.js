import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, useHistory } from "react-router-dom";
import Home from "./components/screens/Home/Home";
import Login from "./components/screens/Login/Login";
import Profile from "./components/screens/Profile/Profile";
import UserProfile from "./components/screens/UserProfile/UserProfile";
import Signup from "./components/screens/Signup/Signup";
import CreatePost from "./components/screens/CreatePosts/CreatePosts";
import { useDispatch } from "./components/reducers/reducerContext";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      dispatch({ type: "logged-in", payload: user });
    } else {
      history.push("/login");
    }
  });

  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </>
  );
}

export default App;
