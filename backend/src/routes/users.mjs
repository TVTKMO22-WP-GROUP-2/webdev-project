import { Router } from "express";
import { checkSchema, matchedData } from "express-validator";
import { userValidation } from "../utils/validationSchemas.mjs";
import { returnValidationErrors } from "../middleware/returnValidationErrors.mjs";
import { User } from "../database/schemas/user.mjs";
import { hashPassword } from "../utils/hash.mjs";
import passport from "passport";

const router = Router();

router.post(
  "/users/signup",
  checkSchema(userValidation),
  returnValidationErrors,
  async (req, res) => {
    const data = matchedData(req);
    // > Check if username is already found in the database
    try {
      const foundUser = await User.findOne({ username: data.username });
      if (foundUser) {
        return res.status(400).send([{ msg: "Username already taken" }]);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    // > Hash the password
    data.password = await hashPassword(data.password);
    // > Create new user object with the validated & sanitized data
    // >  and attempt to save it in the database
    const newUser = new User(data);
    try {
      await newUser.save();
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }
);

router.post(
  "/users/login",
  checkSchema(userValidation),
  returnValidationErrors,
  passport.authenticate("local"),
  (req, res) => {
    return res.status(200).send({ msg: "Login success!" });
  }
);

router.get("/users/status", (req, res) => {
  if (req.user) {
    return res.status(200).send(true);
  } else {
    return res.status(200).send(false);
  }
});

export default router;
