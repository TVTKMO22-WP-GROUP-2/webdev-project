import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/users.mjs"

const app = express();

mongoose
  .connect("mongodb://localhost:27017/database")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error " + err));

app.use(express.json());
app.use(cors());
app.use(usersRouter);

app.listen(3000, () => {
  console.log("Backend server listening on port 3000");
});