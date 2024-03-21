import { Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { userValidation } from "../utils/validationSchemas.mjs";
import { User } from "../database/schemas/user.mjs";
import { hashPassword } from "../utils/hash.mjs";

const router = Router();

router.post("/users/signup", checkSchema(userValidation), async (req, res) => {
  // * Acting on express validator results
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array());
  const data = matchedData(req);
  // * Check if username is already found in the database
  try {
    const foundUser = await User.findOne({ username: data.username });
    if (foundUser) {
      return res.status(400).send([{ msg: "Username already taken" }]);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
  // * Hash the password
  data.password = await hashPassword(data.password);
  // * Create new user object with the validated & sanitized data
  // *  and attempt to save it in the database
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.post("/users/login", checkSchema(userValidation), async (req, res) => {
  // * Acting on express validator results
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array());
  const data = matchedData(req);
  // * Check if username and password pair exists in the database
  try {
    const isUsernameAndPasswordCorrect = await User.findOne({
      username: data.username,
      password: data.password,
    });
    if (isUsernameAndPasswordCorrect === null) {
      return res.status(400).send([{ msg: "Incorrect username or password" }]);
    } else {
      req.session.visited = true;
      return res.status(200).send({ msg: "Login successful!" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
