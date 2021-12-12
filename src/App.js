import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/login" exact component={Login} />
        <Route path="/inscription" exact component={Signup} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;