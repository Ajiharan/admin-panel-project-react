import "./App.css";
import { useSelector } from "react-redux";
import {
  selectEmailVerified,
  selectUserEmail,
} from "./features/auth/UserSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NotVerify from "./components/NotVerify";
import Home from "./components/Home";
import LoadingScreen from "./components/loading/LoadingScreen";
function App() {
  const emailVerified = useSelector(selectEmailVerified);
  const userName = useSelector(selectUserEmail);

  const checkUserLogin = () => {
    let routes;
    if (!emailVerified && !userName) {
      routes = (
        <Switch>
          <Route exact path="/" component={LoadingScreen} />
          <Redirect to="/" />
        </Switch>
      );
    } else if (!emailVerified && userName) {
      routes = (
        <Switch>
          <Route exact path="/notVerify" component={NotVerify} />
          <Redirect to="/notVerify" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      );
    }
    return routes;
  };
  return (
    <div className="App">
      <Router>{checkUserLogin()}</Router>
    </div>
  );
}

export default App;
