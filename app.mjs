import express from "express";
import dotenv from "dotenv";
import CreateError from "./utils/middleware/throwError.mjs";
import ejs from "ejs";
import expressEjsLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

import homeRouter from "./route/home-router.mjs";
import contactRouter from "./route/contact-router.mjs";
import testimoniRouter from "./route/testimoni-router.mjs";
import myProjectRouter from "./route/project-router.mjs";
import userRouter from "./route/user-router.mjs";
import { isLoggin } from "./utils/middleware/isLoggin.mjs";

const upload = multer({ storage: multer.memoryStorage() });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.port || 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(expressEjsLayouts);
app.use("/assets", express.static(path.resolve(__dirname, "assets")));
app.use(
  "/bootstrap",
  express.static(path.resolve(__dirname, "node_modules/bootstrap/dist/css")),
);
app.use(
  "/bootstrap/js",
  express.static(path.resolve(__dirname, "node_modules/bootstrap/js")),
);
app.set("view engine", ejs);
app.set("views", path.resolve(__dirname, "views"));
app.set("view cache", true);

app.use(flash());
app.use(
  session({
    secret: "rahasia bangetsss",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  }),
);

app.use("/home", isLoggin, homeRouter);
app.use("/contact", isLoggin, contactRouter);
app.use("/testimoni", isLoggin, upload.single("inputImage"), testimoniRouter);
app.use("/project", isLoggin, upload.single("imageProject"), myProjectRouter);
app.use("/user", upload.single("image"), userRouter);

app.get("/", (req, res, next) => {
  return res.redirect("/home");
});

app.use("/", (req, res, next) => {
  return next(CreateError(404, "page not found"));
});

app.use((err, req, res, next) => {
  const status = err.status;
  const message = err.message;
  const errorStack = err.stack;
  const succes = false;

  return res.status(status).json({
    status,
    message,
    errorStack,
    succes,
  });
});

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.database);
    console.log(`your app listening on http://localhost:${port}`),
      console.log(`berhasil connect ke database`);
  } catch (err) {
    console.log(err.message);
  }
});
