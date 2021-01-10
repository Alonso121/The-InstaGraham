import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, useHistory } from "react-router-dom";
import Home from "./components/screens/Home/Home";
import Login from "./components/screens/Login/Login";
import Profile from "./components/screens/Profile/Profile";
import Signup from "./components/screens/Signup/Signup";
import CreatePost from "./components/screens/CreatePosts/CreatePosts";
import { ReducerProvider } from "./components/reducers/reducerContext";

function App() {
  const history = useHistory();

  useEffect(() => {
    if (!sessionStorage.jwt || !sessionStorage.user) {
      history.push("/login");
    }
  });

  return (
    <ReducerProvider>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </ReducerProvider>
  );
}

export default App;
