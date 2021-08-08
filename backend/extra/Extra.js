import admin from "firebase-admin";

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
