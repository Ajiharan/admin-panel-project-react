import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Login />
      </Router>
    </div>
  );
}

export default App;
