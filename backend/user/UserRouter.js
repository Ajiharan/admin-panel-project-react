import express from "express";
import { admin } from "../FirebaseConfig.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { verifyAdmin, tokenValidator } from "../extra/Extra.js";
dotenv.config();
const router = express.Router();

router.post(
  "/disable",
  async (req, res, next) => {
    if (await tokenValidator(req.header(process.env.SECREAT_KEY))) {
      next();
    } else {
      res.status(403).json("Sorry your Token is expired!");
    }
  },
  async (req, res) => {
    const uid = req.body.uid;
    const isDisable = req.body.isDisable;
    await admin
      .auth()
      .updateUser(uid, {
        disabled: isDisable,
      })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
  }
);
router.get(
  "/getAll",
  async (req, res, next) => {
    if (await tokenValidator(req.header(process.env.SECREAT_KEY))) {
      next();
    } else {
      res.status(403).json("Sorry your Token is expired!");
    }
  },
  async (req, res) => {
    try {
      const usersResult = await admin.auth().listUsers(1000);
      // console.log(usersResult);
      const users = usersResult.users
        .map(
          ({
            uid,
            emailVerified,
            email,
            photoURL,
            displayName,
            customClaims,

            disabled,
          }) => ({
            uid,
            emailVerified,
            email,
            photoURL,
            displayName,
            customClaims,

            disabled,
          })
        )
        .filter((r) => !r.customClaims);
      res.status(200).json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
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
        displayName: req.body.username,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/admin-panel-demo-8265f.appspot.com/o/icons8-user-48.png?alt=media&token=a7e0c726-6a3b-4159-8cc2-ba2e799872f5",
        disabled: true,
      })
      .then(async (r) => {
        console.log("r", r);
        await admin
          .firestore()
          .collection("users")
          .add({
            uid: r.uid,
            email: r.email,
            userlevel: 0,
            photoUrl:
              "https://firebasestorage.googleapis.com/v0/b/admin-panel-demo-8265f.appspot.com/o/icons8-user-48.png?alt=media&token=a7e0c726-6a3b-4159-8cc2-ba2e799872f5",
            createdAt: r.metadata.creationTime,
            displayName: r.displayName,
          })
          .then((result) => {
            return res.status(200).json(r);
          })
          .catch(async (err) => {
            await admin
              .auth()
              .deleteUser(r.uid)
              .then((_) => {
                return res.status(400).json(err.message);
              })
              .catch((er) => {
                return res.status(400).json(er.message);
              });
          });
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
        { expiresIn: 60 * 20 }
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
