import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import BodyContainer from "./BodyContainer";
import axios from "../../Axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserEmail,
  selectUserLevel,
  selectUid,
} from "../../features/auth/UserSlice";
import {
  selectError,
  selectuserslist,
} from "../../features/auth/userListSlice";
import useSignOut from "../useHooks/useSignOut";

import { getAllUsers, getAllUsersIds } from "../../features/auth/userAction";

const Home = () => {
  const email = useSelector(selectUserEmail);
  const userlevel = useSelector(selectUserLevel);
  const uid = useSelector(selectUid);

  const userList = useSelector(selectuserslist);
  const userListError = useSelector(selectError);

  const { logout } = useSignOut();
  const [storage, setStorage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("auth_admin")) {
      axios
        .post("user/genToken", { email, userlevel, uid })
        .then((res) => {
          localStorage.setItem("auth_admin", JSON.stringify(res.data));
          setStorage(JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log("error", err);
          logout();
        });
    }
  }, [email, userlevel, uid, logout]);

  useEffect(() => {
    if (localStorage.getItem("auth_admin")) {
      dispatch(getAllUsers());
      dispatch(getAllUsersIds());
    }
  }, [storage]);

  useEffect(() => {
    if (userListError !== "") {
      if (userListError?.status === 403) {
        console.log("userListError", userListError);
        logout();
      }
    }
  }, [userList, userListError]);

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
