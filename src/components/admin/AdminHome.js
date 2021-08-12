import React, { useEffect } from "react";
import { auth, db, rd } from "../../Firebase";
import Header from "../header/Header";
import firebase from "firebase";

const AdminHome = () => {
  // const realTimeRef = useRef();
  const checkOnline = async () => {
    let uid = await auth.currentUser.uid;
    let userStatusFirestoreRef = await db.doc("/status/" + uid);
    let userStatusDatabaseRef = rd.ref("/status/" + uid);

    let isOfflineForFirestore = {
      state: "offline",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let isOnlineForFirestore = {
      state: "online",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let isOfflineForDatabase = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    let isOnlineForDatabase = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    firebase
      .database()
      .ref(".info/connected")
      .on("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val() === false) {
          userStatusFirestoreRef.set(isOfflineForFirestore);
          return;
        }

        userStatusDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(function () {
            console.log("onDisconnect called");
            userStatusDatabaseRef.set(isOnlineForDatabase);
            userStatusFirestoreRef.set(isOnlineForFirestore);
          });
      });
  };

  useEffect(() => {
    checkOnline();
    return () => {
      // realTimeRef.current();
    };
  }, []);
  // useEffect(() => {
  //   let isOfflineForFirestore = {
  //     state: "offline",
  //     last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  //   };

  //   let isOnlineForFirestore = {
  //     state: "online",
  //     last_changed: firebase.firestore.FieldValue.serverTimestamp(),
  //   };

  //   if (window.navigator.onLine) {
  //     checkOnline(isOnlineForFirestore);
  //   } else {
  //     checkOnline(isOfflineForFirestore);
  //   }

  //   const onlineListener = window.addEventListener("online", () => {
  //     // console.log("user online");
  //     checkOnline(isOnlineForFirestore);
  //   });
  //   const offlineListener = window.addEventListener("offline", () => {
  //     // console.log("user offline");
  //     checkOnline(isOfflineForFirestore);
  //   });

  //   return () => {
  //     window.removeEventListener("online", onlineListener);
  //     window.removeEventListener("offline", offlineListener);
  //   };
  // }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default AdminHome;
