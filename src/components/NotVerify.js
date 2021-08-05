import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";

const NotVerify = () => {
  const [message, setMessage] = useState("");
  let actionCodeSettings = {
    url: "http://localhost:3000/home",
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    handleCodeInApp: false,
    // When multiple custom dynamic link domains are defined, specify which
    // one to use.
    // dynamicLinkDomain: "example.page.link"
  };
  const sendVerificationLink = () => {
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        setMessage("email verified sucessfully");
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };
  useEffect(() => {
    sendVerificationLink();
  }, []);
  return (
    <div>
      <h2>verify your email</h2>
      <p>go to your email inbox, and please verify your email</p>
      <p>{message}</p>
      <button>Re-send verificaton email</button>
    </div>
  );
};

export default NotVerify;
