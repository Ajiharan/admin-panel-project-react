import React, { useEffect, useState } from "react";
import { auth } from "../Firebase";

const NotVerify = () => {
  const [message, setMessage] = useState("");

  const sendVerificationLink = () => {
    auth.currentUser
      .sendEmailVerification({
        url: "https://admin-panel-demo-8265f.firebaseapp.com/path?confirm_email=true",
      })
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
