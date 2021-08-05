import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../Firebase";
import { useDispatch } from "react-redux";
import { setSignOut } from "../features/auth/UserSlice";
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(
          setSignOut({
            name: null,
            email: null,
            photo: null,
            isEmailVerified: null,
          })
        );
        history.push("/");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div>
      <Link to="/">Login</Link>
      <Link to="/verify">verify</Link>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
