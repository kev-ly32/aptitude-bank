import React from "react";
import LandingPage from "./components/Landing Page/LandingPage";
import Login from "./components/Authentication/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
