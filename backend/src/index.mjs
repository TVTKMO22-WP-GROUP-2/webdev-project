import express from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import routes from "./routes/routes.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { SESSION_SECRET } from "./secret/secrets.mjs";
import "./auth/local-strategy.mjs";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/database")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error " + err));

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(3000, () => {
  console.log("Backend server listening on port 3000");
});
