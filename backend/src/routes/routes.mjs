import { Router } from "express";
import usersRouter from "./users.mjs";
import reviewsRouter from "./reviews.mjs";

const router = Router();

router.use(reviewsRouter);

router.use(usersRouter);

export default router;
