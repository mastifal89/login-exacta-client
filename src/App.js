import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { firebaseApp } from "./utils/firebase";
import firebase from "firebase/app";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Landing from "./components/Landing";
import Home from "./components/Home/Home";

function App() {
  require("firebase/auth");

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Redirect to="home" /> : <Landing />}
          </Route>
          <Route
            path="/home"
            render={() => (isLoggedIn ? <Home /> : <Redirect to="/" />)}
          />
        </Switch>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
