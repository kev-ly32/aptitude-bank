import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./components/Landing Page/LandingPage";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Transaction from "./components/Accounts/Transaction";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { selectUser, login } from "./reducers/Authentication/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //keep user logged in on page refresh if they didn't click logout
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    dispatch(login(loggedInUser));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact>
            {user ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route path="/register" exact>
            {user ? <Redirect to="/dashboard" /> : <Register />}
          </Route>
          <Route path="/dashboard" exact>
            {!user ? <Redirect to="/login" /> : <Dashboard />}
          </Route>
          <Route path="/savings/deposit" exact component={Transaction} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
