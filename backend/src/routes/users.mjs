import { Router } from "express";
import { validationResult, checkSchema, matchedData } from "express-validator";
import { createUserValidation } from "../utils/validationSchemas.mjs";
import { User } from "../database/schemas/user.mjs";

const router = Router();

router.post("/users", checkSchema(createUserValidation), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const data = matchedData(req);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default router;
