import React, { useEffect, useLayoutEffect, useState } from "react";
import Login from "../Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Firebase";
import {
  setUserLoginDetails,
  selectUserEmail,
  selectEmailVerified,
} from "../../features/auth/UserSlice";
import { useHistory } from "react-router-dom";

const LoadingScreen = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const isEmailVerified = useSelector(selectEmailVerified);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // const { displayName, photoURL, emailVerified, email } = user;
        setData(user);

        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!!data) {
      const { displayName, photoURL, emailVerified, email } = data;
      //   console.log("uuser", data);
      dispatch(
        setUserLoginDetails({
          name: displayName,
          email: email,
          photo: photoURL,
          isEmailVerified: emailVerified,
        })
      );
    }
  }, [data]);

  useLayoutEffect(() => {
    if (!loading) {
      console.log("rendered effect");
      if (!!userEmail && isEmailVerified) {
        history.push("/home");
      }
    }
  }, [loading]);

  const checkFunc = () => {
    console.log("ui paint");
    return <Login />;
  };

  return (
    <React.Fragment>{!loading ? checkFunc() : <p>loading</p>}</React.Fragment>
  );
};

export default LoadingScreen;
