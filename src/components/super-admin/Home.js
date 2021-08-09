import React, { useEffect } from "react";
import Header from "../header/Header";
import BodyContainer from "./BodyContainer";
import axios from "../../Axios";
import { useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserLevel,
  selectUid,
} from "../../features/auth/UserSlice";
import useSignOut from "../useHooks/useSignOut";
const Home = () => {
  const email = useSelector(selectUserEmail);
  const userlevel = useSelector(selectUserLevel);
  const uid = useSelector(selectUid);
  const { signout } = useSignOut();
  useEffect(() => {
    if (!localStorage.getItem("auth_admin")) {
      axios
        .post("user/genToken", { email, userlevel, uid })
        .then((res) => {
          console.log("token", res.data);
          localStorage.setItem("auth_admin", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log("error", err);
          signout();
        });
    }
  }, [email, userlevel, uid, signout]);

  return (
    <div>
      {/* <Link to="/">Login</Link>
      <Link to="/verify">verify</Link> */}
      <Header />
      <BodyContainer />
    </div>
  );
};

export default Home;
