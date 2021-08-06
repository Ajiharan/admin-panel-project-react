import React from "react";
import { auth } from "../../Firebase";
import { useDispatch } from "react-redux";
import { setSignOut } from "../../features/auth/UserSlice";
import { useHistory } from "react-router-dom";

const Header = () => {
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
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;
