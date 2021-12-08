import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./router/auth.js";
import twitterRouter from "./router/twitter.js";
import {config} from './config.js';
const app = express();

//✨
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

app.use("/auth", authRouter);
app.use("/tweets", twitterRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
