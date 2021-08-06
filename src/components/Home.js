import React from "react";
import { Link } from "react-router-dom";
import Header from "./header/Header";
const Home = () => {
  return (
    <div>
      <Link to="/">Login</Link>
      <Link to="/verify">verify</Link>
      <Header />
    </div>
  );
};

export default Home;
