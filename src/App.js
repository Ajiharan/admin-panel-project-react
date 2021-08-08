import "./App.css";
import { useSelector } from "react-redux";
import {
  selectEmailVerified,
  selectUserLevel,
  selectUserEmail,
} from "./features/auth/UserSlice";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NotVerify from "./components/NotVerify";
import Home from "./components/super-admin/Home";
import LoadingScreen from "./components/loading/LoadingScreen";
import { Toaster } from "react-hot-toast";
import AdminHome from "./components/admin/AdminHome";
function App() {
  const emailVerified = useSelector(selectEmailVerified);
  const userName = useSelector(selectUserEmail);
  const userLevel = useSelector(selectUserLevel);

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
    } else if (userLevel === 1) {
      routes = (
        <Switch>
          {/* super admin path */}
          <Route exact path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          {/* super admin path */}
          <Route exact path="/home" component={AdminHome} />
          <Redirect to="/home" />
        </Switch>
      );
    }
    return routes;
  };
  return (
    <div className="App">
      <Router>
        {" "}
        <Toaster />
        {checkUserLogin()}
      </Router>
    </div>
  );
}

export default App;
