import React, { useEffect, useState } from "react";
import Login from "../Login";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../Firebase";
import {
  setUserLoginDetails,
  selectUserEmail,
  selectEmailVerified,
} from "../../features/auth/UserSlice";
import { useHistory } from "react-router-dom";
import LoadingSvg from "../common/LoadingSvg";

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
        // await auth.currentUser
        //   .getIdTokenResult(true)
        //   .then((idTokenResult) => {
        //     // Confirm the user is an Admin.
        //     if (!!idTokenResult.claims.admin) {
        //       // Show admin UI.
        //       console.log("idTokenResult true", idTokenResult);
        //     } else {
        //       console.log("idTokenResult", idTokenResult);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        if (loading) {
          db.collection("admins")
            .where("email", "==", user.email)
            .where("userlevel", "==", 1)
            .get()
            .then((querySnapshot) => {
              const arrData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              // console.log("called in db", loading);
              if (arrData.length > 0) {
                // console.log("arrData", arrData);
                setData({ ...user, userlevel: arrData[0].userlevel });
                setLoading(false);
              } else {
                setData({ ...user, userlevel: 0 });
                setLoading(false);
              }
            })
            .catch(() => {
              auth
                .signOut()
                .then(() => {
                  setLoading(false);
                })
                .catch((err) => {
                  setLoading(false);
                });
            });
        }
      } else {
        setLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [dispatch, loading]);

  useEffect(() => {
    if (!!data) {
      const { displayName, photoURL, emailVerified, email, userlevel, uid } =
        data;

      dispatch(
        setUserLoginDetails({
          name: displayName,
          email: email,
          photo: photoURL,
          isEmailVerified: emailVerified,
          userlevel: userlevel,
          uid: uid,
        })
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    // console.log("loading", loading);
    if (!loading) {
      if (!!userEmail && isEmailVerified) {
        history.push("/home");
      }
    }
  }, [history, isEmailVerified, loading, userEmail]);

  const checkFunc = () => {
    return <Login />;
  };

  return <div>{!loading ? checkFunc() : <LoadingSvg />}</div>;
};

export default LoadingScreen;
