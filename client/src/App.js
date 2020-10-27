import React from "react";
import { useSelector } from "react-redux";
import LandingPage from "./components/Landing Page/LandingPage";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const isAuthenticated = useSelector((state) => state.authenticated);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact>
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route path="/register" exact>
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Register />}
          </Route>
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
