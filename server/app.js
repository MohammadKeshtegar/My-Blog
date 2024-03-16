import globalErrorHandler from "./controllers/errorController.js";
import commentRouter from "./routes/commentRoutes.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
import path from "path";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import rateLimit from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
// import xss from "xss-clean";
import hpp from "hpp";

process.on("uncaughtException", (err) => {
  console.log("💥 UNCAUGHT EXCEPTION 💥, shutting down...");
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = express();

app.set("view engine", "pug");
app.set("views", path.join("./views"));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. Pleaes try again in an hour",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(ExpressMongoSanitize());

// app.use(xss());

app.use(hpp());

app.use(express.static("public"));

app.use(cors());

// app.use((req, res, next) => {
//   console.log("cookies", req.cookies);
//   next();
// });

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/comments", commentRouter);

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

process.on("unhandledRejection", (err) => {
  console.log("💥 UNHANDLERD REJECTION 💥, shutting down...");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
