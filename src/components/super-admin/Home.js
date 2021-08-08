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
const Home = () => {
  const email = useSelector(selectUserEmail);
  const userlevel = useSelector(selectUserLevel);
  const uid = useSelector(selectUid);

  useEffect(() => {
    axios
      .post("user/genToken", { email, userlevel, uid })
      .then((res) => {
        console.log("token", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [email, userlevel, uid]);

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
