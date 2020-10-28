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
import { selectUser } from "./reducers/Authentication/userSlice";

function App() {
  const user = useSelector(selectUser);

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
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
