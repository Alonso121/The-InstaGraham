import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/screens/Home/Home";
import Signin from "./components/screens/Login/Login";
import Profile from "./components/screens/Profile/Profile";
import Signup from "./components/screens/Signup/Signup";
import CreatePost from "./components/screens/CreatePosts/CreatePosts";
import { ReducerProvider } from "./components/reducers/reducerContext";

function App() {
  return (
    <ReducerProvider>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/">
          <Signin />
        </Route>
        <Route path="/home">
          <Home />
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
      </BrowserRouter>
    </ReducerProvider>
  );
}

export default App;
