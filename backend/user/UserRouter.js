import express from "express";
import { admin } from "../FirebaseConfig.js";
import dotenv from "dotenv";
import { verifyAdmin } from "../extra/Extra.js";
dotenv.config();
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

router.post("/genToken", async (req, res) => {
  try {
    const email = req.body.email;
    const userlevel = req.body.userlevel;
    const uid = req.body.uid;

    if (await verifyAdmin(uid)) {
      admin
        .auth()
        .createCustomToken(uid, { email, userlevel })
        .then((token) => {
          return res.header(process.env.SECREAT_KEY, token).json(token);
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    } else {
      res.status(403).json("Unauthorized access");
    }
  } catch (err) {}
});

router.get("/get", (req, res) => {
  admin
    .auth()
    .getUserByEmail("baskaranajiharan1243@gmail.com")
    .then((user) => {
      console.log(user);
      if (user.emailVerified) {
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
