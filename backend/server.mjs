import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import UserRouter from "./user/UserRouter.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 70,
});
app.use(limiter);

const PORT = process.env.PORT || 5000;

app.use("/user", UserRouter);
app.get("/", (req, res) => {
  res.send("welcome every-one");
});
app.listen(PORT, () => {
  console.log(`port listen in ${PORT}`);
});
