import React, { useEffect } from "react";
import { auth } from "../Firebase";
const NotVerify = () => {
  useEffect(() => {
    auth.currentUser.sendEmailVerification().then(() => {
      // Email verification sent!
      // ...
    });
  }, []);
  return (
    <div>
      <h2>Email is Not Verify please verify</h2>
    </div>
  );
};

export default NotVerify;
