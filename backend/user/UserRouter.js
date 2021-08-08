import express from "express";
import { admin } from "../FirebaseConfig.js";
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    admin
      .auth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
      })
      .then((r) => {
        console.log("r", r);
        return res.status(200).json(r);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } catch (err) {}
});

router.post("/genToken", (req, res) => {
  try {
    const email = req.body.email;
    const userlevel = req.body.userlevel;
    const uid = req.body.uid;

    console.log(email, userlevel);
    admin
      .auth()
      .createCustomToken(uid, { email, userlevel })
      .then((token) => {
        return res.status(200).json(token);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } catch (err) {}
});

router.get("/get", (req, res) => {
  admin
    .auth()
    .getUserByEmail("baskaranajiharan1243@gmail.com")
    .then((user) => {
      console.log(user);
      // Confirm user is verified.
      if (user.emailVerified) {
        // Add custom claims for additional privileges.
        // This will be picked up by the user on token refresh or next sign in on new device.
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
        });
      }
    })
    .then((r) => {
      res.status(200).json("sd");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});
export default router;
