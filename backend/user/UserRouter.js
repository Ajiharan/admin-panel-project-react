import express from "express";
import { admin } from "../FirebaseConfig.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verifyAdmin, tokenValidator } from "../extra/Extra.js";
dotenv.config();
const router = express.Router();

router.post(
  "/add",
  async (req, res, next) => {
    if (await tokenValidator(req.header(process.env.SECREAT_KEY))) {
      next();
    } else {
      res.status(403).json("Sorry your Token is expired!");
    }
  },
  async (req, res) => {
    await admin
      .auth()
      .createUser({
        email: req.body.email,
        password: req.body.password,
      })
      .then((r) => {
        // console.log("r", r);
        return res.status(200).json(r);
      })
      .catch((err) => {
        // console.log("err", err.message);
        return res.status(400).json(err.message);
      });
  }
);

router.post("/genToken", async (req, res) => {
  try {
    const email = req.body.email;
    const userlevel = req.body.userlevel;
    const uid = req.body.uid;

    if (await verifyAdmin(uid)) {
      const adminToken = await jwt.sign(
        {
          uid,
          userlevel,
          email,
        },
        process.env.SECREAT_KEY,
        { expiresIn: 60 * 30 }
      );
      res.status(200).json(adminToken);
    } else {
      res.status(401).json("Unauthorized access");
    }
  } catch (err) {}
});

router.get("/get", (req, res) => {
  admin
    .auth()
    .getUserByEmail(process.env.admin_email)
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
