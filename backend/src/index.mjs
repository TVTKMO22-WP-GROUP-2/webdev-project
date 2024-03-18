import express from 'express';
import mongoose from 'mongoose';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { User } from "./database/schemas/user.mjs";
import { createUserValidation } from './utils/validationSchemas.mjs';

const app = express();

mongoose
    .connect("mongodb://localhost:27017/database")
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Error " + err));

app.use(express.json());

app.listen(3000, () => {
    console.log("Backend server listening on port 3000");
})

app.post("/users", checkSchema(createUserValidation), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const data = matchedData(req);
    const newUser = new User(data);
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
});