import admin from "firebase-admin";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyAdmin = async (uid) => {
  // Lookup the user associated with the specified uid.
  let isAdmin = false;
  await admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      if (userRecord?.customClaims["admin"]) {
        isAdmin = true;
      }
    })
    .catch((err) => {});
  return isAdmin;
};
export const tokenValidator = async (token) => {
  try {
    const data = await jwt.verify(token, process.env.SECREAT_KEY);
    console.log(data);
    return data ? true : false;
  } catch (err) {
    return false;
  }
};
